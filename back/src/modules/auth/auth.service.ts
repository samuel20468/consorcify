import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { CreateCAdminDto } from '../c-admin/dto/create-c-admin.dto';
import { checkPassword } from 'src/helpers/hashPassword.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { CADMIN_PASS, ROLE, SAT } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(CAdmin)
    private readonly cAdminRepository: Repository<CAdmin>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentials: CredentialsDto): Promise<object> {
    const { email, password } = credentials;
    const foundCAdmin = await this.cAdminRepository.findOneBy({ email });
    const foundUser = await this.usersRepository.findOneBy({ email });
    if (!foundCAdmin && !foundUser) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    if (foundCAdmin) {
      const validatePassword = await checkPassword(
        password,
        foundCAdmin.password,
      );
      if (!validatePassword) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const role = [];
      role.push(ROLE.CADMIN);
      const userPayload = {
        id: foundCAdmin.id,
        email: foundCAdmin.email,
        roles: [...role],
      };
      const token = this.jwtService.sign(userPayload);
      return { token };
    } else if (foundUser) {
      const validatePassword = await checkPassword(
        password,
        foundUser.password,
      );

      if (!validatePassword) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const role = [];
      if (foundUser.is_super_admin) {
        role.push(ROLE.SUPERADMIN);
      } else {
        role.push(ROLE.USER);
      }
      const userPayload = {
        id: foundUser.id,
        email: foundUser.email,
        roles: [...role],
      };
      const token = this.jwtService.sign(userPayload);
      return { token };
    }
  }

  async signUp(user: CreateUserDto): Promise<User> {
    const { first_name, last_name, email, password } = user;
    const foundUser = await this.usersRepository.findOneBy({ email });

    if (foundUser) {
      throw new ConflictException('El email ya se encuentra registrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.email = email;
    newUser.password = hashedPassword;

    const createdUser = await this.usersRepository.save(newUser);
    delete createdUser.password;
    delete createdUser.is_super_admin;
    delete createdUser.active;
    return createdUser;
  }

  async singUpCAdmin(consAdmin: CreateCAdminDto): Promise<CAdmin> {
    const { name, address, email, phone_number, cuit, sat, rpa } = consAdmin;
    const foundCAdmin = await this.cAdminRepository.findOneBy({ email });
    if (foundCAdmin) {
      throw new ConflictException('El email ya se encuentra registrado.');
    }

    const hashedPassword = await bcrypt.hash(CADMIN_PASS, 10);
    let satCAdmin: SAT;
    switch (sat) {
      case 'Monotributo':
        satCAdmin = SAT.MONOTAX;
        break;
      case 'Responsable Inscripto':
        satCAdmin = SAT.REGISTERED_RESPONSIBLE;
        break;
      case 'Responsable No Inscripto':
        satCAdmin = SAT.NON_REGISTERED_RESPONSIBLE;
        break;
      case 'Exento':
        satCAdmin = SAT.EXEMPT;
        break;
    }

    const newCAdmin = new CAdmin();
    newCAdmin.name = name;
    newCAdmin.email = email;
    newCAdmin.password = hashedPassword;
    newCAdmin.address = address;
    newCAdmin.phone_number = phone_number;
    newCAdmin.cuit = cuit;
    newCAdmin.sat = satCAdmin;
    newCAdmin.rpa = rpa;

    const createdCAdmin = await this.cAdminRepository.save(newCAdmin);
    delete createdCAdmin.active;
    delete createdCAdmin.password;
    return createdCAdmin;
  }
}
