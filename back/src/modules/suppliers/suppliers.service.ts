import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { TPagination } from 'src/utils/types';
import { Supplier } from './entities/supplier.entity';
import { SuppliersRepository } from './suppliers.repository';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async createSupplier(newSupplier: CreateSupplierDto): Promise<Supplier> {
    return this.suppliersRepository.createSupplier(newSupplier);
  }

  async findAll({ page, limit }: TPagination): Promise<Supplier[]> {
    const suppliers: Supplier[] = await this.suppliersRepository.findAll();

    if (suppliers.length == 0)
      throw new NotFoundException('No suppliers found');

    page = Math.max(1, page);

    limit = Math.max(1, limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return suppliers.slice(startIndex, endIndex);
  }

  async findOne(id: string): Promise<Supplier> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const supplier: Supplier = await this.suppliersRepository.findOne(id);

    if (!supplier) throw new NotFoundException('Supplier not found');

    return supplier;
  }

  async updateSupplier(
    id: string,
    supplierToUpdate: UpdateSupplierDto,
  ): Promise<Supplier> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const existingSupplier: Supplier =
      await this.suppliersRepository.findOne(id);

    if (!existingSupplier) throw new NotFoundException('Supplier not found');

    

    const updatedSupplier: Supplier =
      await this.suppliersRepository.updateSupplier(
        existingSupplier,
        supplierToUpdate,
      );
    return updatedSupplier;
  }

  async toggleStatus(id: string) {
    let status: boolean;

    if (!id) {
      throw new BadRequestException('id is required');
    }

    const existingSupplier: Supplier = await this.findOne(id);

    status = existingSupplier.active;

    if (!existingSupplier) throw new NotFoundException('Supplier not found');

    await this.suppliersRepository.toggleStatus(id, status);

    return existingSupplier;
  }
}
