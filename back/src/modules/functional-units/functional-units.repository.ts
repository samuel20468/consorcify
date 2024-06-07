import { Injectable, NotFoundException } from '@nestjs/common';
import { FunctionalUnit } from './entities/functional-unit.entity';
import { CreateFunctionalUnitDto } from './dto/create-functional-unit.dto';
import { UpdateFunctionalUnitDto } from './dto/update-functional-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { generateFunctionalUnitCode } from 'src/helpers/generate-functional-unit-code.helper';

@Injectable()
export class FunctionalUnitsRepository {
  constructor(
    @InjectRepository(FunctionalUnit)
    private functionalUnitsRepository: Repository<FunctionalUnit>,
    @InjectRepository(Consortium)
    private consortiumRepository: Repository<Consortium>,
  ) {}

  async findAll(page: number, limit: number): Promise<FunctionalUnit[]> {
    const functionalUnits = await this.functionalUnitsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return functionalUnits;
  }

  async findOne(id: string): Promise<FunctionalUnit | undefined> {
    return await this.functionalUnitsRepository.findOne({ where: { id } });
  }

  async findByConsortium(
    consortiumId: string,
    page: number,
    limit: number,
  ): Promise<FunctionalUnit[]> {
    return await this.functionalUnitsRepository.find({
      where: { consortium: { id: consortiumId } },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
  async create(
    createFunctionalUnitDto: CreateFunctionalUnitDto,
  ): Promise<FunctionalUnit> {
    const consortium = await this.consortiumRepository.findOne({
      where: { id: createFunctionalUnitDto.consortium_id },
    });

    if (!consortium) {
      throw new NotFoundException(
        `Consortium with id ${createFunctionalUnitDto.consortium_id} not found`,
      );
    }

    const code = generateFunctionalUnitCode();
    const functionalUnit = this.functionalUnitsRepository.create({
      ...createFunctionalUnitDto,
      code,
    });

    try {
      const newFunctionalUnit =
        await this.functionalUnitsRepository.save(functionalUnit);
      const consortium = await this.consortiumRepository.findOne({
        where: { id: createFunctionalUnitDto.consortium_id },
        relations: ['functional_units'],
      });

      consortium.functional_units.push(newFunctionalUnit);

      if (consortium.ufs < consortium.functional_units.length) {
        consortium.ufs += 1;
      }
      await this.consortiumRepository.save(consortium);
      return functionalUnit;
    } catch (error) {
      throw new Error(`Error creating functional unit: ${error.message}`);
    }
  }

  async update(
    id: string,
    updateFunctionalUnitDto: UpdateFunctionalUnitDto,
  ): Promise<FunctionalUnit> {
    const functionalUnit = await this.functionalUnitsRepository.findOne({
      where: { id },
    });

    if (!functionalUnit) {
      throw new NotFoundException(`Functional unit with id ${id} not found`);
    }

    return await this.functionalUnitsRepository.save({
      ...functionalUnit,
      ...updateFunctionalUnitDto,
    });
  }

  async toggleStatus(id: string, status: boolean): Promise<void> {
    await this.functionalUnitsRepository.update(id, { active: !status });
  }
}
