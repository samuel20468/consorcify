import { Injectable } from '@nestjs/common';
import { CreateFunctionalUnitDto } from './dto/create-functional-unit.dto';
import { UpdateFunctionalUnitDto } from './dto/update-functional-unit.dto';

@Injectable()
export class FunctionalUnitsService {
  create(createFunctionalUnitDto: CreateFunctionalUnitDto) {
    return 'This action adds a new functionalUnit';
  }

  findAll() {
    return `This action returns all functionalUnits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} functionalUnit`;
  }

  update(id: number, updateFunctionalUnitDto: UpdateFunctionalUnitDto) {
    return `This action updates a #${id} functionalUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} functionalUnit`;
  }
}
