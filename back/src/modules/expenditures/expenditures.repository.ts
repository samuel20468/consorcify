import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expenditure } from './entities/expenditure.entity';
import { Repository } from 'typeorm';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';

@Injectable()
export class ExpendituresRepository {
  constructor(
    @InjectRepository(Expenditure)
    private expenditureRepository: Repository<Expenditure>,
  ) {}

  async create(
    createExpenditureDto: CreateExpenditureDto,
  ): Promise<Expenditure> {
    return await this.expenditureRepository.save(createExpenditureDto);
  }
}
