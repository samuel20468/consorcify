import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expenditure } from './entities/expenditure.entity';
import { Repository } from 'typeorm';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { SupplierConsortium } from '../suppliers/entities/suppliers-consortiums.entity';

@Injectable()
export class ExpendituresRepository {
  constructor(
    @InjectRepository(Expenditure)
    private expenditureRepository: Repository<Expenditure>,
    @InjectRepository(SupplierConsortium) private supplierConsortiumRepository: Repository<SupplierConsortium>,
  ) {}

  async create(
    createExpenditureDto: CreateExpenditureDto,
  ): Promise<Expenditure> {
    const supplier_consortium = await this.supplierConsortiumRepository.findOneBy({
      supplier_id: createExpenditureDto.supplier_id,
      consortium_id: createExpenditureDto.consortium_id,
    })

    if (!supplier_consortium) {
      throw new NotFoundException('El proveedor del consorcio no existe');
    }
    try {
      return await this.expenditureRepository.save(createExpenditureDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
