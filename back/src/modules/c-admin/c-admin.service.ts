import { Injectable } from '@nestjs/common';
import { CreateCAdminDto } from './dto/create-c-admin.dto';
import { UpdateCAdminDto } from './dto/update-c-admin.dto';

@Injectable()
export class CAdminService {
  create(createCAdminDto: CreateCAdminDto) {
    return 'This action adds a new cAdmin';
  }

  findAll() {
    return `This action returns all cAdmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cAdmin`;
  }

  update(id: number, updateCAdminDto: UpdateCAdminDto) {
    return `This action updates a #${id} cAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} cAdmin`;
  }
}
