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
import { Repository } from 'typeorm';
import { Consortium } from '../consortiums/entities/consortium.entity';
import checkEntityExistence from 'src/helpers/check-entity-existence.helper';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly suppliersRepository: SuppliersRepository,
    private readonly consortiumsService: ConsortiumsService,
  ) {}

  async createSupplier(newSupplier: CreateSupplierDto): Promise<Supplier> {
    const { name, cuit, email, phone_number, address, balance, consortium_id } =
      newSupplier;

    const consortium: Consortium = await checkEntityExistence(
      this.consortiumsService,
      consortium_id,
      'el Consorcio',
    );

    const foundSupplier: Supplier =
      await this.suppliersRepository.findOneByCuitAndConsortium(
        cuit,
        consortium_id,
      );

    if (foundSupplier) {
      throw new ConflictException(
        `El proveedor con el CUIT ${cuit} ya existe`,
      )
    }
    const supplierToCreate = new Supplier();
    supplierToCreate.name = name;
    supplierToCreate.cuit = cuit;
    supplierToCreate.email = email;
    supplierToCreate.phone_number = phone_number;
    supplierToCreate.address = address;
    supplierToCreate.balance = balance;
    supplierToCreate.consortium = consortium;

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

  async findAllByConsortium(consortiumId: string, page: number, limit: number) {
    return await this.suppliersRepository.findAllByConsortium(consortiumId, page, limit);
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
