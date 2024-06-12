import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expenditure } from './entities/expenditure.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { EXPENDITURE_STATUS, EXPENSE_STATUS } from 'src/utils/constants';
import { Expense } from '../expenses/entities/expense.entity';

@Injectable()
export class ExpendituresRepository {
  constructor(
    @InjectRepository(Expenditure)
    private expenditureRepository: Repository<Expenditure>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createExpenditureDto: CreateExpenditureDto,
  ): Promise<Expenditure> {
    const supplier = await this.supplierRepository.findOneBy({
      id: createExpenditureDto.supplier_id,
      consortium: { id: createExpenditureDto.consortium_id },
    });

    if (!supplier) {
      throw new NotFoundException('El proveedor del consorcio no existe');
    }

    const foundExpenditure = await this.expenditureRepository.findOne({
      where: {
        supplier: { id: createExpenditureDto.supplier_id },
        invoice_number: createExpenditureDto.invoice_number,
      },
    });

    if (foundExpenditure) {
      throw new ConflictException(`La factura ${createExpenditureDto.invoice_number} del proveedor ${createExpenditureDto.supplier_id} ya existe`);
    }

    const expense: Expense = await this.expenseRepository.findOneBy({
      id: createExpenditureDto.expense_id,
      consortium: { id: createExpenditureDto.consortium_id },
    });

    if (!expense) {
      throw new NotFoundException(`La expensa id ${createExpenditureDto.expense_id} del consorcio id ${createExpenditureDto.consortium_id} no existe`);
    }

    if (expense.status === EXPENSE_STATUS.CLOSED)
      throw new ConflictException(
        'No se puede añadir un gasto a una expensa cerrada',
      );

    const expenditure = this.expenditureRepository.create({
      ...createExpenditureDto,
      supplier,
      expense,
    });
    try {
      const newExpenditure = await this.expenditureRepository.save(expenditure);
      const newSupplierBalance =
        supplier.balance + createExpenditureDto.total_amount;
      await this.supplierRepository.update(supplier, {
        balance: newSupplierBalance,
      });
      const newExpenseTotalAmount =
        expense.total_amount + createExpenditureDto.total_amount;
      await this.expenseRepository.update(expense, {
        total_amount: newExpenseTotalAmount,
      });
      return this.expenditureRepository.findOne({
        where: { id: newExpenditure.id },
        relations: ['supplier', 'expense'],
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(page: number, limit: number): Promise<Expenditure[]> {
    return await this.expenditureRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['supplier'],
    });
  }

  async findOne(id: string): Promise<Expenditure> {
    return await this.expenditureRepository.findOne({
      where: { id },
      relations: ['supplier', 'expense'],
    });
  }

  async update(
    id: string,
    updateExpenditureDto: UpdateExpenditureDto,
  ): Promise<Expenditure> {
    const expenditure = await this.expenditureRepository.findOne({
      where: { id },
      relations: ['supplier'],
    });
    if (!expenditure) {
      throw new NotFoundException(`Gasto con id ${id} no encontrado`);
    }

    if (expenditure.status === EXPENDITURE_STATUS.PAID) {
      throw new ConflictException(
        `El gasto con id ${id} ya ha sido pagado, no se puede modificar`,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      if (updateExpenditureDto.total_amount) {
        console.log(expenditure);

        const newSupplierBalance =
          expenditure.supplier.balance -
          expenditure.total_amount +
          updateExpenditureDto.total_amount;

        expenditure.supplier.balance = newSupplierBalance;
        await queryRunner.manager.save(expenditure.supplier);
      }

      Object.assign(expenditure, updateExpenditureDto);
      await queryRunner.manager.save(expenditure);

      await queryRunner.commitTransaction();
      return await this.expenditureRepository.findOne({
        where: { id },
        relations: ['supplier'],
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }

  async disable(id: string): Promise<Expenditure> {
    const expenditure = await this.expenditureRepository.findOne({
      where: { id },
      relations: ['supplier', 'expense'],
    });
    if (!expenditure) {
      throw new NotFoundException(`Gasto con id ${id} no encontrado`);
    }
    if (expenditure.status === EXPENDITURE_STATUS.PAID) {
      throw new ConflictException(
        `El gasto con id ${id} ya ha sido pagado, no se puede modificar`,
      );
    }
    if (expenditure.expense.status === EXPENSE_STATUS.CLOSED) {
      throw new ConflictException(
        `La expensa con id ${expenditure.expense.id} ya ha sido cerrada, no se puede eliminar el gasto`,
      );
    }
    const newSupplierBalance =
      expenditure.supplier.balance - expenditure.total_amount;
    expenditure.supplier.balance = newSupplierBalance;
    await this.supplierRepository.save(expenditure.supplier);
    const newExpenseTotalAmount = expenditure.expense.total_amount - expenditure.total_amount;
    await this.expenseRepository.update(expenditure.expense, {
      total_amount: newExpenseTotalAmount,
    })
    expenditure.active = false;
    await this.expenditureRepository.save(expenditure);
    return this.expenditureRepository.findOne({
      where: { id },
      relations: ['supplier', 'expense'],
    })
  }
}
