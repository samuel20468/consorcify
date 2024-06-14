import { Injectable, NotFoundException } from '@nestjs/common';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { GoogleMapsService } from '../google-maps/google-maps.service';
import { GeocodeResult } from '@googlemaps/google-maps-services-js';
import { Consortium } from '../consortiums/entities/consortium.entity';

@Injectable()
export class SuppliersRepository {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    @InjectRepository(Consortium)
    private readonly consortiumRepository: Repository<Consortium>,
    private readonly googleMapsService: GoogleMapsService,
  ) {}

  async createSupplier(newSupplier: Partial<Supplier>): Promise<Supplier> {
    const googleMapsResponse: GeocodeResult =
      await this.googleMapsService.getGeocoding({
        street: newSupplier.address, number: "", city: "",
      });
    if (!googleMapsResponse) {
      throw new NotFoundException(`No se encontró ubicación para el domicilio ingresado (Geocoder Error)`);
    }
    newSupplier.latitude = googleMapsResponse.geometry.location.lat;
    newSupplier.longitude = googleMapsResponse.geometry.location.lng;

    return await this.supplierRepository.save(newSupplier);
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find({
      where: { active: true },
      relations: ['consortium'],
    });
  }

  async findAllByConsortium(consortiumId: string, page: number, limit: number) {
    const consortium = await this.consortiumRepository.findOneBy({
      id: consortiumId,
    });
    if (!consortium) {
      throw new NotFoundException(`El Consorcio id ${consortiumId} no existe`);
    }
    
    return await this.supplierRepository.find({
      where: { consortium: { id: consortiumId } },
      relations: ['expenditures', 'consortium'],
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string): Promise<Supplier> {
    return this.supplierRepository.findOne({
      where: { id },
      relations: ['expenditures'],
    });
  }

  async findOneByCuitAndConsortium(
    cuit: string,
    consortiumId: string,
  ): Promise<Supplier> {
    return this.supplierRepository.findOneBy({
      cuit,
      consortium: { id: consortiumId },
    });
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
