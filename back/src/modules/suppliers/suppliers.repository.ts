import { Injectable } from '@nestjs/common';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { checkForDuplicates } from 'src/helpers/check-for-duplicates.helper';

@Injectable()
export class SuppliersRepository {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async createSupplier(newSupplier: Supplier): Promise<Supplier> {
    return await this.supplierRepository.save(newSupplier);
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find({
      where: { active: true },
      relations: ['consortium'],
    });
  }

  async findOne(id: string): Promise<Supplier> {
    return this.supplierRepository.findOne({
      where: { id },
      relations: ['expenditures'],
    });
  }

  async findOneByCuitAndConsortium(cuit: string, consortiumId: string): Promise<Supplier> {
    return this.supplierRepository.findOneBy({ cuit, consortium: { id: consortiumId } });
  }

  async updateSupplier(
    existingSupplier: Supplier,
    supplierToUpdate: UpdateSupplierDto,
  ): Promise<Supplier> {
    const { name } = existingSupplier;
    const supplierToUpdateName = supplierToUpdate.name;

    name !== supplierToUpdateName &&
      (await checkForDuplicates(
        this.supplierRepository,
        supplierToUpdateName,
        'name',
        'El nombre',
      ));

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
