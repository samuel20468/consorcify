import { Injectable } from '@nestjs/common';
import { ConsortiumsRepository } from './consortiums.repository';
import { Consortium } from './entities/consortium.entity';

@Injectable()
export class ConsortiumsService {
  constructor(private readonly consortiumsRepository: ConsortiumsRepository) {};

  create(consortium: Partial<Consortium>) {
    return 'This action adds a new consortium';
  }

  findAll(page: number, limit: number) {
    return `This action returns all consortiums`;
  }

  findOne(id: string) {
    return `This action returns a #${id} consortium`;
  }

  update(id: string, consortium: Partial<Consortium>) {
    return `This action updates a #${id} consortium`;
  }

  remove(id: string) {
    return `This action removes a #${id} consortium`;
  }
}
