import { Injectable } from '@nestjs/common';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersRepository {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async createSupplier(newSupplier: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.supplierRepository.create(newSupplier);
    return this.supplierRepository.save(supplier);
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find({
      where: { active: true },
    });
  }

  async findOne(id: string): Promise<Supplier> {
    return this.supplierRepository.findOneBy({ id });
  }

  async updateSupplier(
    existingSupplier: Supplier,
    supplierToUpdate: UpdateSupplierDto,
  ): Promise<Supplier> {
    const mergedSupplier: Supplier = this.supplierRepository.merge(
      existingSupplier,
      supplierToUpdate,
    );

    return await this.supplierRepository.save(mergedSupplier);
  }

  async toggleStatus(id: string, status: boolean): Promise<void> {
    await this.supplierRepository.update(id, { active: !status });
  }
}
