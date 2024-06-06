import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expenditure } from './entities/expenditure.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { SupplierConsortium } from '../suppliers/entities/suppliers-consortiums.entity';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import { EXPENDITURE_STATUS } from 'src/utils/constants';

@Injectable()
export class ExpendituresRepository {
  constructor(
    @InjectRepository(Expenditure)
    private expenditureRepository: Repository<Expenditure>,
    @InjectRepository(SupplierConsortium)
    private supplierConsortiumRepository: Repository<SupplierConsortium>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createExpenditureDto: CreateExpenditureDto,
  ): Promise<Expenditure> {
    const supplier_consortium =
      await this.supplierConsortiumRepository.findOneBy({
        supplier_id: createExpenditureDto.supplier_id,
        consortium_id: createExpenditureDto.consortium_id,
      });

    if (!supplier_consortium) {
      throw new NotFoundException('El proveedor del consorcio no existe');
    }

    const expenditure = this.expenditureRepository.create({
      ...createExpenditureDto,
      supplier_consortium,
    });
    try {
      const newExpenditure = await this.expenditureRepository.save(expenditure);
      const newSupplierConsortiumBalance =
        supplier_consortium.balance + createExpenditureDto.total_amount;
      await this.supplierConsortiumRepository.update(supplier_consortium, {
        balance: newSupplierConsortiumBalance,
      });
      return newExpenditure;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllByConsortium(
    consortiumId: string,
    page: number,
    limit: number,
  ): Promise<Expenditure[]> {
    return await this.expenditureRepository.find({
      where: { supplier_consortium: { consortium_id: consortiumId } },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['supplier_consortium'],
    });
  }

  async findAllUnpaidByConsortium(
    consortiumId: string,
    page: number,
    limit: number,
  ): Promise<Expenditure[]> {
    return await this.expenditureRepository.find({
      where: {
        supplier_consortium: { consortium_id: consortiumId },
        status: EXPENDITURE_STATUS.UNPAID,
        active: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['supplier_consortium'],
    });
  }

  async findOne(id: string): Promise<Expenditure> {
    return await this.expenditureRepository.findOne({
      where: { id },
      relations: ['supplier_consortium'],
    });
  }

  async update(
    id: string,
    updateExpenditureDto: UpdateExpenditureDto,
  ): Promise<Expenditure> {
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

    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      if (updateExpenditureDto.total_amount) {
        console.log(expenditure);

        const newSupplierConsortiumBalance =
          expenditure.supplier_consortium.balance -
          expenditure.total_amount +
          updateExpenditureDto.total_amount;

        expenditure.supplier_consortium.balance = newSupplierConsortiumBalance;
        await queryRunner.manager.save(expenditure.supplier_consortium);
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
    const newSupplierConsortiumBalance = expenditure.supplier_consortium.balance - expenditure.total_amount;
    expenditure.supplier_consortium.balance = newSupplierConsortiumBalance;
    await this.supplierConsortiumRepository.save(expenditure.supplier_consortium);
    expenditure.active = false;
    return await this.expenditureRepository.save(expenditure);
  }
}
