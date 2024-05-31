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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { CADMIN_PASS, SAT } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';
import { signInHelper } from 'src/helpers/signIn.helper';
import { TObjectToken } from 'src/utils/types';
import satSetter from 'src/helpers/satSetter.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(CAdmin)
    private readonly cAdminRepository: Repository<CAdmin>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentials: CredentialsDto): Promise<TObjectToken> {
    const { email, password } = credentials;
    const foundCAdmin = await this.cAdminRepository.findOneBy({ email });
    const foundUser = await this.usersRepository.findOneBy({ email });
    if (!foundCAdmin && !foundUser) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    if (foundCAdmin) {
      const tokenAdmin: Promise<TObjectToken> = signInHelper(
        foundCAdmin,
        password,
        this.jwtService,
      );
      return tokenAdmin;
    } else if (foundUser) {
      const tokenUser: Promise<TObjectToken> = signInHelper(
        foundUser,
        password,
        this.jwtService,
      );
      return tokenUser;
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
    const satCAdmin: SAT = satSetter(sat);

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
