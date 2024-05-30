import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consortium } from './entities/consortium.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConsortiumsRepository {
  constructor(
    @InjectRepository(Consortium)
    private consortiumsRepository: Repository<Consortium>,
  ) {}

  async create(consortium: Partial<Consortium>) {
    const foundConsortium = await this.consortiumsRepository.findOne({
      where: { cuit: consortium.cuit },
    });
    if (foundConsortium) {
      throw new ConflictException(
        `Consorcio CUIT: ${consortium.cuit} ya se encuentra cargado.`,
      );
    }
    const newConsortium = await this.consortiumsRepository.save(consortium);
    return newConsortium;
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await this.consortiumsRepository.find({ skip, take: limit });
  }

  async findOne(id: string) {
    const consortium = await this.consortiumsRepository.findOne({
      where: { id: id },
    });
    if (!consortium) {
      throw new NotFoundException(`Consorcio ID: ${id} no encontrado.`);
    }
    return consortium;
  }

  async update(id: string, consortium: Partial<Consortium>) {
    const consortiumToUpdate = await this.consortiumsRepository.findOne({
      where: { id: id },
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
      where: { id: id },
    });
    return updatedConsortium;
  }

  async remove(id: string) {
    const consortiumToDelete = await this.consortiumsRepository.findOne({
      where: { id: id },
    });
    if (!consortiumToDelete) {
      throw new NotFoundException(`Consorcio ID: ${id} no encontrado.`);
    }
    this.consortiumsRepository.remove(consortiumToDelete);
    return consortiumToDelete;
  }
}
