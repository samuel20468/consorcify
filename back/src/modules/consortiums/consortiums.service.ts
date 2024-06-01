import { Injectable } from '@nestjs/common';
import { ConsortiumsRepository } from './consortiums.repository';
import { Consortium } from './entities/consortium.entity';

@Injectable()
export class ConsortiumsService {
  constructor(private readonly consortiumsRepository: ConsortiumsRepository) {};

  create(consortium: Partial<Consortium>) {
    return this.consortiumsRepository.create(consortium);
  }

  findAll(page: number, limit: number) {
    return this.consortiumsRepository.findAll(page, limit);
  }

  findAllByCAdmin(id: string) {
    return this.consortiumsRepository.findAllByCAdmin(id);
  }

  findOne(id: string) {
    return this.consortiumsRepository.findOne(id);
  }

  update(id: string, consortium: Partial<Consortium>) {
    return this.consortiumsRepository.update(id, consortium);
  }

  remove(id: string) {
    return this.consortiumsRepository.remove(id);
  }
}
