import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateCAdminDto } from './dto/update-c-admin.dto';
import { CAdminsRepository } from './c-admin.repository';
import { TPagination } from 'src/utils/types';
import { CAdmin } from './entities/c-admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { SAT } from 'src/utils/constants';
import * as bcrypt from 'bcrypt';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { UpdatePassDto } from './dto/udpate-pass.dto';
import { checkPassword } from 'src/helpers/hash-password.helper';

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
      throw new BadRequestException('El ID del Administrador es requerido');
    }

    const cAdmin: CAdmin = await this.cAdminsRepository.findOne(id);

    if (!cAdmin) throw new NotFoundException('Administrador no encontrado');

    return cAdmin;
  }

  async updatePassCAdmin(
    id: string,
    passToUpdate: UpdatePassDto,
  ): Promise<void> {
    const { old_password, password } = passToUpdate;
    const foundCAdmin: CAdmin = await this.cAdminsRepository.findOne(id);

    if (!foundCAdmin) {
      throw new NotFoundException('Administrador no encontrado');
    }

    const passwordsChecked = await checkPassword(
      old_password,
      foundCAdmin.password,
    );
    if (!passwordsChecked) {
      throw new UnauthorizedException(
        'Ha proporcionado una contraseña inválida',
      );
    }
    const newPassword = await bcrypt.hash(password, 10);
    foundCAdmin.password = newPassword;
    await this.cAdminsRepository.saveNewPassword(foundCAdmin);
  }

  async updateCAdmin(
    id: string,
    cAdminToUpdate: UpdateCAdminDto,
  ): Promise<CAdmin> {
    if (!id) {
      throw new BadRequestException('El ID del Administrador es requerido');
    }

    const existingCAdmin: CAdmin = await this.cAdminsRepository.findOne(id);

    if (!existingCAdmin)
      throw new NotFoundException('Administrador no encontrado');

    const updatedCAdmin: CAdmin = await this.cAdminsRepository.updateCAdmin(
      existingCAdmin,
      cAdminToUpdate,
    );

    delete updatedCAdmin.active;

    return updatedCAdmin;
  }

  async delete(id: string): Promise<CAdmin> {
    if (!id) {
      throw new BadRequestException('El ID del Administrador es requerido');
    }

    const existingCAdmin: CAdmin = await this.findOne(id);

    if (!existingCAdmin)
      throw new NotFoundException('Administrador no encontrado');

    await this.cAdminsRepository.delete(id);

    if (existingCAdmin.consortiums.length > 0) {
      const foundCustomCAdmin = await this.cAdminsRepository.findOneByEmail(
        'sin_administrador_asignado@consorcify.com',
      );
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
