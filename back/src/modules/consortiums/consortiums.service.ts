import { Injectable } from '@nestjs/common';
import { CreateConsortiumDto } from './dto/create-consortium.dto';
import { UpdateConsortiumDto } from './dto/update-consortium.dto';

@Injectable()
export class ConsortiumsService {
  create(createConsortiumDto: CreateConsortiumDto) {
    return 'This action adds a new consortium';
  }

  findAll() {
    return `This action returns all consortiums`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consortium`;
  }

  update(id: number, updateConsortiumDto: UpdateConsortiumDto) {
    return `This action updates a #${id} consortium`;
  }

  remove(id: number) {
    return `This action removes a #${id} consortium`;
  }
}
