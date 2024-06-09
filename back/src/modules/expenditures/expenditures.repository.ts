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
import { ExpensesRepository } from '../expenses/expenses.repository';
import { Expense } from '../expenses/entities/expense.entity';
import checkEntityExistence from 'src/helpers/check-entity-existence.helper';

@Injectable()
export class ExpendituresRepository {
  constructor(
    @InjectRepository(Expenditure)
    private expenditureRepository: Repository<Expenditure>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    private expensesRepository: ExpensesRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createExpenditureDto: CreateExpenditureDto,
  ): Promise<Expenditure> {
    const { expense_id, supplier_id, consortium_id } = createExpenditureDto;
    const supplier = await this.supplierRepository.findOneBy({
      id: createExpenditureDto.supplier_id,
    })

    if (!supplier) {
      throw new NotFoundException('El proveedor del consorcio no existe');
    }

    const foundExpenditure = await this.expenditureRepository.findOne({
      where: {
        supplier: { id: createExpenditureDto.supplier_id },
        invoice_number: createExpenditureDto.invoice_number,
      },
    })

    if (foundExpenditure) {
      throw new ConflictException('La factura ya existe');
    }
      
    const expense: Expense = await checkEntityExistence(
      this.expensesRepository,
      expense_id,
      'la expensa',
    );

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
      return newExpenditure;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Expenditure[]> {
    return await this.expenditureRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['supplier'],
    });
  }

  async findOne(id: string): Promise<Expenditure> {
    return await this.expenditureRepository.findOne({
      where: { id },
      relations: ['supplier_consortium', 'expense'],
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
        relations: ['supplier_consortium'],
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
      relations: ['supplier_consortium'],
    });
    if (!expenditure) {
      throw new NotFoundException(`Gasto con id ${id} no encontrado`);
    }
    if (expenditure.status === EXPENDITURE_STATUS.PAID) {
      throw new ConflictException(
        `El gasto con id ${id} ya ha sido pagado, no se puede modificar`,
      );
    }
    const newSupplierBalance = expenditure.supplier.balance - expenditure.total_amount;
    expenditure.supplier.balance = newSupplierBalance;
    await this.supplierRepository.save(expenditure.supplier);
    expenditure.active = false;
    return await this.expenditureRepository.save(expenditure);
  }
}
