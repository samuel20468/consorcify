import { Injectable, NotFoundException } from '@nestjs/common';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { checkForDuplicates } from 'src/helpers/check-for-duplicates.helper';
import { GoogleMapsService } from '../google-maps/google-maps.service';
import { GeocodeResult } from '@googlemaps/google-maps-services-js';

@Injectable()
export class SuppliersRepository {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
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
