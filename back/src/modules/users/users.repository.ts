import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 'f7a7de29-91e6-4fd1-85c8-1360a68c9327',
      first_name: 'Juan',
      last_name: 'Pérez',
      email: 'juan.perez@example.com',
      password: 'Password123!',
      active: true,
      is_super_admin: false,
    },
    {
      id: 'eb93037a-4f48-45c4-bab0-77d7f2e35b3b',
      first_name: 'María',
      last_name: 'López',
      email: 'maria.lopez@example.com',
      password: 'SecureP@ss2',
      active: true,
      is_super_admin: false,
    },
    {
      id: 'cda17006-3e13-42fb-ae5e-09e6a3f7e489',
      first_name: 'Carlos',
      last_name: 'Gómez',
      email: 'carlos.gomez@example.com',
      password: 'StrongP@ss3',
      active: true,
      is_super_admin: true,
    },
    {
      id: '4f1c7fc8-c439-4f7a-92fb-bac487ef5ab7',
      first_name: 'Ana',
      last_name: 'Martínez',
      email: 'ana.martinez@example.com',
      password: 'Passw0rd!',
      active: true,
      is_super_admin: false,
    },
    {
      id: '0b4c8cfb-b82b-4b6d-9125-4903d130d4e4',
      first_name: 'Luis',
      last_name: 'Fernández',
      email: 'luis.fernandez@example.com',
      password: 'MySecur3P@ss',
      active: true,
      is_super_admin: false,
    },
  ];

  async findAll(): Promise<User[]> {
    return await this.users;
  }
  async findOne(id: string): Promise<User | undefined> {
    return await this.users.find((user) => user.id === id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User | undefined> {
    const userExists = await this.findOneByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const user = {
      ...createUserDto, 
      id: uuidv4(),
      active: true,
      is_super_admin: false,
    };
    this.users.push(user);
    return user;
  }

  findOneByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
