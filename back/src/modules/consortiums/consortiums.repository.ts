import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consortium } from './entities/consortium.entity';
import { Repository } from 'typeorm';
import { CAdmin } from '../c-admin/entities/c-admin.entity';

@Injectable()
export class ConsortiumsRepository {
  constructor(
    @InjectRepository(Consortium)
    private consortiumsRepository: Repository<Consortium>,
    @InjectRepository(CAdmin)
    private readonly cAdminRepository: Repository<CAdmin>,
  ) {}

  private removeActiveField(consortium: Partial<Consortium>): Partial<Consortium> {
    const { active, ...rest } = consortium;
    return rest;
  }

  private removeActiveFieldFromArray(consortiums: Partial<Consortium>[]): Partial<Consortium>[] {
    return consortiums.map(consortium => this.removeActiveField(consortium));
  }

  async create(consortium: Partial<Consortium>) {
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
    const newConsortium = await this.consortiumsRepository.save(consortium);
    return this.removeActiveField(newConsortium);
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const consortiums = await this.consortiumsRepository.find({
      relations: { c_admin: true },
      where: { active: true }, skip, take: limit });
    return this.removeActiveFieldFromArray(consortiums);
  }

  async findAllByCAdmin(id: string) {
    const foundCAdmin = await this.cAdminRepository.findOne({
      where: { id: id, active: true },
    });
    if (!foundCAdmin) {
      throw new NotFoundException(`CAdmin ID: ${id} no encontrado.`);
    }
    const consortiums = await this.consortiumsRepository.find({
      relations: { c_admin: true },
      where: { c_admin: foundCAdmin, active: true },
    });
    return this.removeActiveFieldFromArray(consortiums);
  }

  async findOne(id: string) {
    const consortium = await this.consortiumsRepository.findOne({
      relations: { c_admin: true },
      where: { id: id, active: true },
    });
    if (!consortium) {
      throw new NotFoundException(`Consorcio ID: ${id} no encontrado.`);
    }
    return this.removeActiveField(consortium);
  }

  async update(id: string, consortium: Partial<Consortium>) {
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
    const updatedConsortium = await this.consortiumsRepository.findOne({
      relations: { c_admin: true },
      where: { id: id, active: true },
    });
    return this.removeActiveField(updatedConsortium);
  }

  async remove(id: string) {
    const consortiumToDelete = await this.consortiumsRepository.findOne({
      relations: { c_admin: true },
      where: { id: id, active: true },
    });
    if (!consortiumToDelete) {
      throw new NotFoundException(`Consorcio ID: ${id} no encontrado.`);
    }
    consortiumToDelete.active = false;
    await this.consortiumsRepository.save(consortiumToDelete);
    return this.removeActiveField(consortiumToDelete);
  }
}
