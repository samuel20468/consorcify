import { Injectable } from '@nestjs/common';
import { CreateFunctionalUnitDto } from './dto/create-functional-unit.dto';
import { UpdateFunctionalUnitDto } from './dto/update-functional-unit.dto';
import { FunctionalUnitsRepository } from './functional-units.repository';
import { FunctionalUnit } from './entities/functional-unit.entity';

@Injectable()
export class FunctionalUnitsService {
  
  constructor(private readonly functionalUnitsRepository: FunctionalUnitsRepository) {}
  async create(createFunctionalUnitDto: CreateFunctionalUnitDto): Promise<FunctionalUnit> {
    return await this.functionalUnitsRepository.create(createFunctionalUnitDto);
  }

  async findAll(page: number, limit: number): Promise<FunctionalUnit[]> {
    return await this.functionalUnitsRepository.findAll(page, limit);
  }

  async findOne(id: string): Promise<FunctionalUnit | undefined> {
    return await this.functionalUnitsRepository.findOne(id);
  }

  async findByConsortium(consortiumId: string, page: number, limit: number): Promise<FunctionalUnit[]> {
    return await this.functionalUnitsRepository.findByConsortium(consortiumId, page, limit);
  }
  async update(id: string, updateFunctionalUnitDto: UpdateFunctionalUnitDto): Promise<FunctionalUnit> {
    return await this.functionalUnitsRepository.update(id, updateFunctionalUnitDto);
  }

  remove(id: number) {
    return `This action removes a #${id} functionalUnit`;
  }
}
