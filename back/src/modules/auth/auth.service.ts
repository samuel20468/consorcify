import { Injectable } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterConsAdminDto } from './dto/register-cons-admin.dto';

@Injectable()
export class AuthService {
  async signIn(credentials: CredentialsDto): Promise<string> {
    const { email, password } = credentials;
    return 'Usuario Loggeado';
  }
  async signUp(user: CreateUserDto): Promise<string> {
    const { name, lastname, email, password } = user;
    return 'Usuario Registrado';
  }
  async registerConsAdmin(consAdmin: RegisterConsAdminDto): Promise<string> {
    const { name, address, email, phone, cuit, sat, rpa } = consAdmin;
    return 'Administrador de Consorcio Registrado';
  }
}
