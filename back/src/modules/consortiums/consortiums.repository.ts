import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consortium } from './entities/consortium.entity';
import { Repository } from 'typeorm';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { ExcludeActiveInterceptor } from 'src/interceptors/exclude-active.interceptor';
import { GoogleMapsService } from '../google-maps/google-maps.service';
import {
  AddressType,
  GeocodeResult,
  GeocodingAddressComponentType,
} from '@googlemaps/google-maps-services-js';

@Injectable()
export class ConsortiumsRepository {
  constructor(
    @InjectRepository(Consortium)
    private consortiumsRepository: Repository<Consortium>,
    @InjectRepository(CAdmin)
    private readonly cAdminRepository: Repository<CAdmin>,
    private readonly googleMapsService: GoogleMapsService,
  ) {}

  async create(consortium: Partial<Consortium>): Promise<Consortium> {
    const foundConsortium = await this.consortiumsRepository.findOne({
      where: { cuit: consortium.cuit },
    });
    if (foundConsortium) {
      throw new ConflictException(
        `Consorcio CUIT: ${consortium.cuit} ya se encuentra cargado.`,
      );
    }
    const foundCAdmin = await this.cAdminRepository.findOne({
      where: { id: consortium.c_admin as unknown as string },
    });
    if (!foundCAdmin) {
      throw new NotFoundException(
        `CAdmin ID: ${consortium.c_admin} no encontrado.`,
      );
    }

    const googleMapsResponse: GeocodeResult =
      await this.googleMapsService.getGeocoding({
        street: consortium.street_name,
        number: consortium.building_number.toString(),
        city: consortium.city,
      });
    if (!googleMapsResponse) {
      throw new NotFoundException(
        `No se encontró ubicación para el domicilio ingresado (Geocoder Error)`,
      );
    }

    const addressComponents = googleMapsResponse.address_components;
    const getAddressComponent = (types: (AddressType | GeocodingAddressComponentType)[]) =>
      addressComponents.find((component) => types.every((type) => component.types.includes(type)));

    const streetNameComponent = getAddressComponent([AddressType.route]);
    const buildingNumberComponent = getAddressComponent([AddressType.street_number]);
    const zipCodeComponent = getAddressComponent([AddressType.postal_code]);
    const countryComponent = getAddressComponent([AddressType.country]);
    const provinceComponent = getAddressComponent([AddressType.administrative_area_level_1, AddressType.political]);
    const cityComponent = getAddressComponent([AddressType.locality, AddressType.political]);

    consortium.latitude = googleMapsResponse.geometry.location.lat;
    consortium.longitude = googleMapsResponse.geometry.location.lng;
    consortium.street_name = streetNameComponent ? streetNameComponent.short_name : consortium.street_name;
    consortium.building_number = buildingNumberComponent ? Number(buildingNumberComponent.short_name) : consortium.building_number;
    consortium.zip_code = zipCodeComponent ? zipCodeComponent.short_name : consortium.zip_code;
    consortium.country = countryComponent ? countryComponent.long_name : consortium.country;
    consortium.province = provinceComponent ? provinceComponent.short_name : consortium.province;
    consortium.city = cityComponent ? cityComponent.short_name : consortium.city;

    const newConsortium: Consortium =
      await this.consortiumsRepository.save(consortium);
    return newConsortium;
  }

  async findAll(page: number, limit: number): Promise<Consortium[]> {
    const skip = (page - 1) * limit;
    const consortiums: Consortium[] = await this.consortiumsRepository.find({
      relations: { c_admin: true, functional_units: true },
      where: { active: true },
      skip,
      take: limit,
    });
    return consortiums;
  }

  async findAllByCAdmin(id: string): Promise<Consortium[]> {
    const foundCAdmin = await this.cAdminRepository.findOne({
      where: { id: id, active: true },
    });
    if (!foundCAdmin) {
      throw new NotFoundException(`CAdmin ID: ${id} no encontrado.`);
    }
    const consortiums: Consortium[] = await this.consortiumsRepository.find({
      relations: { c_admin: true },
      where: { c_admin: foundCAdmin, active: true },
    });
    return consortiums;
  }

  async findOne(id: string): Promise<Consortium> {
    const consortium: Consortium = await this.consortiumsRepository.findOne({
      relations: {
        c_admin: true,
        functional_units: {
          user: true,
        },
      },
      where: { id: id, active: true },
    });
    if (!consortium) {
      throw new NotFoundException(`Consorcio ID: ${id} no encontrado.`);
    }
    return consortium;
  }

  async update(
    id: string,
    consortium: Partial<Consortium>,
  ): Promise<Consortium> {
    const consortiumToUpdate = await this.consortiumsRepository.findOne({
      where: { id: id, active: true },
    });

    if (!consortiumToUpdate) {
      throw new NotFoundException(`Consorcio ID: ${id} no encontrado.`);
    }
    if (consortium.cuit && consortium.cuit !== consortiumToUpdate.cuit) {
      throw new ConflictException(
        `El CUIT del Consorcio no puede ser cambiado.`,
      );
    }

    await this.consortiumsRepository.update(id, consortium);
    const updatedConsortium: Consortium =
      await this.consortiumsRepository.findOne({
        relations: { c_admin: true },
        where: { id: id, active: true },
      });
    return updatedConsortium;
  }

  async remove(id: string): Promise<Consortium> {
    const consortiumToDelete: Consortium =
      await this.consortiumsRepository.findOne({
        relations: { c_admin: true },
        where: { id: id, active: true },
      });
    if (!consortiumToDelete) {
      throw new NotFoundException(`Consorcio ID: ${id} no encontrado.`);
    }
    consortiumToDelete.active = false;
    await this.consortiumsRepository.save(consortiumToDelete);
    return consortiumToDelete;
  }
}
