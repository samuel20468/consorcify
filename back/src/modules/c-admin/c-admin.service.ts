import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCAdminDto } from './dto/create-c-admin.dto';
import { UpdateCAdminDto } from './dto/update-c-admin.dto';
import { CAdminsRepository } from './c-admin.repository';
import { TPagination } from 'src/utils/types';
import { CAdmin } from './entities/c-admin.entity';
import { checkForDuplicates } from 'src/helpers/check-for-duplicates.helper';

@Injectable()
export class CAdminsService {
  constructor(private readonly cAdminsRepository: CAdminsRepository) {}

  async findAll({ page, limit }: TPagination): Promise<CAdmin[]> {
    const cAdmins: CAdmin[] = await this.cAdminsRepository.findAll();

    if (cAdmins.length == 0) throw new NotFoundException('No cAdmins found');
    cAdmins.forEach((cAdmin) => {
      delete cAdmin.password;
    });

    page = Math.max(1, page);

    limit = Math.max(1, limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return cAdmins.slice(startIndex, endIndex);
  }

  async findOne(id: string): Promise<CAdmin> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const cAdmin: CAdmin = await this.cAdminsRepository.findOne(id);

    if (!cAdmin) throw new NotFoundException('CAdmin not found');

    return cAdmin;
  }
  async updateCAdmin(
    id: string,
    cAdminToUpdate: UpdateCAdminDto,
  ): Promise<CAdmin> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const existingCAdmin: CAdmin = await this.cAdminsRepository.findOne(id);

    if (!existingCAdmin) throw new NotFoundException('CAdmin not found');

    const updatedCAdmin: CAdmin = await this.cAdminsRepository.updateCAdmin(
      existingCAdmin,
      cAdminToUpdate,
    );

    delete updatedCAdmin.active;

    return updatedCAdmin;
  }

  async delete(id: string): Promise<CAdmin> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const existingCAdmin: CAdmin = await this.findOne(id);

    if (!existingCAdmin) throw new NotFoundException('CAdmin not found');

    await this.cAdminsRepository.delete(id);

    return existingCAdmin;
  }
}
