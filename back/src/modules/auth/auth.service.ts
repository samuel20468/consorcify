import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { checkPassword } from 'src/helpers/hashPassword.helper';
import { CreateCAdminDto } from '../c-admin/dto/create-c-admin.dto';

@Injectable()
export class AuthService {
  async signIn(credentials: CredentialsDto): Promise<string> {
    const { email, password } = credentials;
    const foundCAdmin = false;
    const foundUser = true;
    if (!foundCAdmin && !foundUser) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (foundCAdmin) {
      //   const validatePassword = checkPassword(password, foundCAdmin.password);
      //   if (!validatePassword) {
      //     throw new UnauthorizedException('Credenciales inválidas');
      //   }
    } else if (foundUser) {
      //   const validatePassword = checkPassword(password, foundUser.password);
      //   if (!validatePassword) {
      //     throw new UnauthorizedException('Credenciales inválidas');
      //   }
    }

    return 'Usuario Loggeado';
  }

  async signUp(user: CreateUserDto): Promise<string> {
    const { name, lastname, email, password } = user;
    const foundUser = false;
    if (foundUser) {
      throw new ConflictException('El email ya se encuentra registrado.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    // newUser.name = name;
    // newUser.lastname = lastname;
    // newUser.email = email;
    // newUser.password = hashedPassword;

    return 'Usuario Registrado';
  }

  async singUpCAdmin(consAdmin: CreateCAdminDto): Promise<string> {
    const { name, address, email, phone_number, cuit, sat, rpa } = consAdmin;
    const foundCAdmin = false;
    if (foundCAdmin) {
      throw new ConflictException('El email ya se encuentra registrado.');
    }
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   const newCAdmin= new CAdmin()
    //   newCAdmin.name= name
    //   newCAdmin.address= address;
    //   newCAdmin.email=email
    //   newCAdmin.phone_number= phone_number;
    //   newCAdmin.cuit= cuit;
    //   newCAdmin.sat= sat;
    //   newCAdmin.rpa= rpa;
    return 'Administrador de Consorcio Registrado';
  }
}
