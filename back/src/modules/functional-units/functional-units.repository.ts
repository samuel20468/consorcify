import { Injectable, NotFoundException } from '@nestjs/common';
import { FunctionalUnit } from './entities/functional-unit.entity';
import { CreateFunctionalUnitDto } from './dto/create-functional-unit.dto';
import { UpdateFunctionalUnitDto } from './dto/update-functional-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { generateFunctionalUnitCode } from 'src/helpers/generate-functional-unit-code.helper';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FunctionalUnitsRepository {
  constructor(
    @InjectRepository(FunctionalUnit)
    private functionalUnitsRepository: Repository<FunctionalUnit>,
    @InjectRepository(Consortium)
    private consortiumRepository: Repository<Consortium>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(page: number, limit: number): Promise<FunctionalUnit[]> {
    const functionalUnits = await this.functionalUnitsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: { consortium: true },
    });
    return functionalUnits;
  }

  async findOne(id: string): Promise<FunctionalUnit | undefined> {
    return await this.functionalUnitsRepository.findOne({
      where: { id },
      relations: { consortium: true, user: true },
    });
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
      consortium,
    });

    try {
      const newFunctionalUnit =
        await this.functionalUnitsRepository.save(functionalUnit);
      const consortium = await this.consortiumRepository.findOne({
        where: { id: createFunctionalUnitDto.consortium_id },
        relations: ['functional_units'],
      });

      if (consortium.ufs < consortium.functional_units.length) {
        consortium.ufs += 1;
      }
      await this.consortiumRepository.save(consortium);
      return newFunctionalUnit;
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

  async assignUserToFunctionalUnit(
    functionalUnitCode: string,
    userId: string,
  ): Promise<FunctionalUnit> {
    const functionalUnit: FunctionalUnit =
      await this.functionalUnitsRepository.findOne({
        where: { code: functionalUnitCode },
        relations: ['user'],
      });

    if (!functionalUnit) {
      throw new NotFoundException(
        `La unidad funcional con el código ${functionalUnitCode} no existe`,
      );
    }

    const user: User = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['functional_units'],
    });
    if (!user) {
      throw new NotFoundException(`El usuario con el id ${userId} no existe`);
    }
    try {
      if (user.functional_units.length === 0) {
        user.active = true;
        await this.usersRepository.save(user);
      }

      functionalUnit.user = user;
      const updatedFunctionalUnit: FunctionalUnit =
        await this.functionalUnitsRepository.save(functionalUnit);

      return await this.functionalUnitsRepository.findOne({
        where: { id: updatedFunctionalUnit.id },
        relations: ['user', 'user.functional_units'],
      });
    } catch (error) {
      throw new Error(
        `Error al asignar el usuario a la unidad funcional: ${error.message}`,
      );
    }
  }
}
