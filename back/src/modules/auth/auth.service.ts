import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { CreateCAdminDto } from '../c-admin/dto/create-c-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { CADMIN_PASS, SAT } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';
import { generateToken, signInHelper } from 'src/helpers/sign-in.helper';
import { IAuth0User, TObjectToken } from 'src/utils/types';
import satSetter from 'src/helpers/sat-setter.helper';
import { checkForDuplicates } from 'src/helpers/check-for-duplicates.helper';

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

  async signUp(user: CreateUserDto): Promise<TObjectToken> {
    const { first_name, last_name, email, password } = user;

    await checkForDuplicates(this.usersRepository, email, 'email', 'El Email');
    await checkForDuplicates(this.cAdminRepository, email, 'email', 'El email');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.email = email;
    newUser.password = hashedPassword;

    const createdUser = await this.usersRepository.save(newUser);
    const tokenUser = generateToken(createdUser, this.jwtService);
    return tokenUser;
  }

  async singUpCAdmin(consAdmin: CreateCAdminDto): Promise<CAdmin> {
    const { name, address, email, phone_number, cuit, sat, rpa } = consAdmin;

    await checkForDuplicates(this.cAdminRepository, email, 'email', 'El email');
    await checkForDuplicates(this.cAdminRepository, cuit, 'cuit', 'El CUIT');
    await checkForDuplicates(
      this.cAdminRepository,
      rpa,
      'rpa',
      'El número de mátrícula RPA',
    );

    await checkForDuplicates(this.usersRepository, email, 'email', 'El Email');

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
    return createdCAdmin;
  }
}
