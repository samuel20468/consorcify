import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { checkPassword } from 'src/helpers/hash-password.helper';
import * as bcrypt from 'bcrypt';
import { UpdatePassDto } from '../c-admin/dto/udpate-pass.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(page: number, limit: number): Promise<User[]> {
    return await this.usersRepository.findAll(page, limit);
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async updatePassUser(id: string, passToUpdate: UpdatePassDto): Promise<void> {
    const { old_password, password } = passToUpdate;
    const foundUser: User = await this.usersRepository.findOne(id);

    if (!foundUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const passwordsChecked = await checkPassword(
      old_password,
      foundUser.password,
    );
    if (!passwordsChecked) {
      throw new UnauthorizedException(
        'Ha proporcionado una contraseña inválida',
      );
    }
    const newPassword = await bcrypt.hash(password, 10);
    foundUser.password = newPassword;
    await this.usersRepository.saveNewPassword(foundUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async toggleStatus(id: string): Promise<User> {
    let status: boolean;
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    status = user.active;
    await this.usersRepository.toggleStatus(id, status);
    return await this.usersRepository.findOne(id);
  }
}
