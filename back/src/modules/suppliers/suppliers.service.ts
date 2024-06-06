import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { TPagination } from 'src/utils/types';
import { Supplier } from './entities/supplier.entity';
import { SuppliersRepository } from './suppliers.repository';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ConsortiumsService } from '../consortiums/consortiums.service';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierConsortium } from './entities/suppliers-consortiums.entity';
import { Repository } from 'typeorm';
import { Consortium } from '../consortiums/entities/consortium.entity';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly suppliersRepository: SuppliersRepository,
    private readonly consortiumsService: ConsortiumsService,
    @InjectRepository(SupplierConsortium)
    private readonly supplierConsortiumRepository: Repository<SupplierConsortium>,
  ) {}

  async createSupplier(newSupplier: CreateSupplierDto) {
    const {
      name,
      cuit,
      email,
      phone_number,
      address,
      balance,
      initial_balance,
      consortium_id,
    } = newSupplier;

    const foundConsortium: Consortium =
      await this.consortiumsService.findOne(consortium_id);

    if (!foundConsortium)
      throw new ConflictException(
        'No se encontró el consorcio, el cual se requiere para relacionar con el proveedor',
      );

    const supplierToCreate = new Supplier();
    supplierToCreate.name = name;
    supplierToCreate.cuit = cuit;
    supplierToCreate.email = email;
    supplierToCreate.phone_number = phone_number;
    supplierToCreate.address = address;
    supplierToCreate.balance = balance;

    const supplierCreated: Supplier =
      await this.suppliersRepository.createSupplier(supplierToCreate);

    const newSuppliersConsortiums = new SupplierConsortium();
    newSuppliersConsortiums.consortium = foundConsortium;
    newSuppliersConsortiums.supplier = supplierCreated;
    newSuppliersConsortiums.balance = initial_balance;

    const suppliersConsortiums: SupplierConsortium =
      await this.supplierConsortiumRepository.save(newSuppliersConsortiums);

    
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
