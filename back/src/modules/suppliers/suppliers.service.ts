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
import { CreateSupplierConsortiumDto } from './dto/create-supplier-consortium.dto';
import checkEntityExistence from 'src/helpers/check-entity-existence.helper';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly suppliersRepository: SuppliersRepository,
    private readonly consortiumsService: ConsortiumsService,
    @InjectRepository(SupplierConsortium)
    private readonly supplierConsortiumRepository: Repository<SupplierConsortium>,
  ) {}

  async addConsortiumToSupplier(
    supplierId: string,
    newSupplierConsortium: CreateSupplierConsortiumDto,
  ) {
    const { consortium_id, initial_balance } = newSupplierConsortium;

    const foundSupplier: Supplier = await checkEntityExistence(
      this.suppliersRepository,
      supplierId,
      'el proveedor',
    );

    const foundConsortium: Consortium = await checkEntityExistence(
      this.consortiumsService,
      consortium_id,
      'el consorcio',
    );

    const foundSupplierConsortium: SupplierConsortium =
      await this.supplierConsortiumRepository.findOne({
        where: {
          supplier_id: supplierId,
          consortium_id,
        },
      });
    if (foundSupplierConsortium)
      throw new ConflictException(
        `El proveedor ${foundSupplier.name} ya se encuentra asociado a ${foundConsortium.name}`,
      );

    const newSuppliersConsortiums = new SupplierConsortium();
    newSuppliersConsortiums.consortium = foundConsortium;
    newSuppliersConsortiums.supplier = foundSupplier;
    newSuppliersConsortiums.balance = initial_balance;

    const suppliersConsortiums: SupplierConsortium =
      await this.supplierConsortiumRepository.save(newSuppliersConsortiums);

    return suppliersConsortiums;
  }
  async createSupplier(newSupplier: CreateSupplierDto): Promise<Supplier> {
    const { name, cuit, email, phone_number, address, balance } = newSupplier;

    const supplierToCreate = new Supplier();
    supplierToCreate.name = name;
    supplierToCreate.cuit = cuit;
    supplierToCreate.email = email;
    supplierToCreate.phone_number = phone_number;
    supplierToCreate.address = address;
    supplierToCreate.balance = balance;

    const supplierCreated: Supplier =
      await this.suppliersRepository.createSupplier(supplierToCreate);

    return supplierCreated;
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

    const foundSupplier: Supplier = await checkEntityExistence(
      this.suppliersRepository,
      id,
      'el proveedor',
    );

    return foundSupplier;
  }

  async updateSupplier(
    id: string,
    supplierToUpdate: UpdateSupplierDto,
  ): Promise<Supplier> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const existingSupplier: Supplier = await checkEntityExistence(
      this.suppliersRepository,
      id,
      'el proveedor',
    );

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

    const foundSupplier: Supplier = await checkEntityExistence(
      this.suppliersRepository,
      id,
      'el proveedor',
    );

    status = foundSupplier.active;

    await this.suppliersRepository.toggleStatus(id, status);

    return foundSupplier;
  }
}
