import {
  ConflictException,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consortium } from './entities/consortium.entity';
import { Repository } from 'typeorm';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { ExcludeActiveInterceptor } from 'src/interceptors/exclude-active.interceptor';

@Injectable()
@UseInterceptors(ExcludeActiveInterceptor)
export class ConsortiumsRepository {
  constructor(
    @InjectRepository(Consortium)
    private consortiumsRepository: Repository<Consortium>,
    @InjectRepository(CAdmin)
    private readonly cAdminRepository: Repository<CAdmin>,
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
    const newConsortium: Consortium =
      await this.consortiumsRepository.save(consortium);
    return newConsortium;
  }

  async findAll(page: number, limit: number): Promise<Consortium[]> {
    const skip = (page - 1) * limit;
    const consortiums: Consortium[] = await this.consortiumsRepository.find({
      relations: { c_admin: true },
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
      relations: { c_admin: true },
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
