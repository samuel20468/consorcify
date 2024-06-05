import { Injectable } from '@nestjs/common';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';

@Injectable()
export class ExpendituresService {
  create(createExpenditureDto: CreateExpenditureDto) {
    return 'This action adds a new expenditure';
  }

  findAll() {
    return `This action returns all expenditures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenditure`;
  }

  update(id: number, updateExpenditureDto: UpdateExpenditureDto) {
    return `This action updates a #${id} expenditure`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenditure`;
  }
}
