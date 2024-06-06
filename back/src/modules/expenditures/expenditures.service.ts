import { Injectable } from '@nestjs/common';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import { ExpendituresRepository } from './expenditures.repository';
import { Expenditure } from './entities/expenditure.entity';

@Injectable()
export class ExpendituresService {

  constructor(private readonly ExpendituresRepository: ExpendituresRepository) {}
  async create(createExpenditureDto: CreateExpenditureDto): Promise<Expenditure> {
    return await this.ExpendituresRepository.create(createExpenditureDto);
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
