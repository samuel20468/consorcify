import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCAdminDto } from './dto/update-c-admin.dto';
import { CAdminsRepository } from './c-admin.repository';
import { TPagination } from 'src/utils/types';
import { CAdmin } from './entities/c-admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { SAT } from 'src/utils/constants';
import { ConsortiumsRepository } from '../consortiums/consortiums.repository';
import { Consortium } from '../consortiums/entities/consortium.entity';

@Injectable()
export class CAdminsService {
  constructor(
    private readonly cAdminsRepository: CAdminsRepository,
    private readonly authService: AuthService,
    @InjectRepository(Consortium)
    private readonly consortiumsRepository: Repository<Consortium>,
  ) {}

  async findAll({ page, limit }: TPagination): Promise<CAdmin[]> {
    const cAdmins: CAdmin[] = await this.cAdminsRepository.findAll();

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

    if (existingCAdmin.consortiums.length > 0) {
      const foundCustomCAdmin = await this.cAdminsRepository.findOneByEmail(
        'sin_administrador_asignado@consorcify.com',
      )
      let customCAdmin;

      if (!foundCustomCAdmin) {
        customCAdmin = await this.authService.singUpCAdmin({
          email: 'sin_administrador_asignado@consorcify.com',
          name: 'Sin Administrador Asignado',
          address: 'Administrador de Consorcios',
          phone_number: '+541111111111',
          cuit: '11111111111',
          sat: SAT.MONOTAX,
          rpa: '11111',
        });
      } else {
        customCAdmin = foundCustomCAdmin;
      }

      for (const consortium of existingCAdmin.consortiums) {
        consortium.c_admin = customCAdmin;
        await this.consortiumsRepository.save(consortium);
      }
    }

    return existingCAdmin;
  }
}
