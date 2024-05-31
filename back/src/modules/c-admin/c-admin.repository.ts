import { BadRequestException, Injectable } from '@nestjs/common';
import { CAdmin } from './entities/c-admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCAdminDto } from './dto/create-c-admin.dto';

@Injectable()
export class CAdminsRepository {
  constructor(
    @InjectRepository(CAdmin)
    private readonly cAdminRepository: Repository<CAdmin>,
  ) {}

  async findAll(): Promise<CAdmin[]> {
    return await this.cAdminRepository.find();
  }

  async findOne(id: string): Promise<CAdmin> {
    return await this.cAdminRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<CAdmin> {
    return await this.cAdminRepository.findOneBy({ email });
  }

  async updateCAdmin(
    existingCAdmin: CAdmin,
    cAdminToUpdate: CreateCAdminDto,
  ): Promise<CAdmin> {
    const mergedCAdmin: CAdmin = this.cAdminRepository.merge(
      existingCAdmin,
      cAdminToUpdate,
    );

    return await this.cAdminRepository.save(mergedCAdmin);
  }

  async delete(id: string): Promise<void> {
    await this.cAdminRepository.update(id, { active: false });
  }
}
