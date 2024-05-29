import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 'f7a7de29-91e6-4fd1-85c8-1360a68c9327',
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@example.com',
      password: 'Password123!',
      active: true,
      isSuperAdmin: false,
    },
    {
      id: 'eb93037a-4f48-45c4-bab0-77d7f2e35b3b',
      firstName: 'María',
      lastName: 'López',
      email: 'maria.lopez@example.com',
      password: 'SecureP@ss2',
      active: true,
      isSuperAdmin: false,
    },
    {
      id: 'cda17006-3e13-42fb-ae5e-09e6a3f7e489',
      firstName: 'Carlos',
      lastName: 'Gómez',
      email: 'carlos.gomez@example.com',
      password: 'StrongP@ss3',
      active: true,
      isSuperAdmin: true,
    },
    {
      id: '4f1c7fc8-c439-4f7a-92fb-bac487ef5ab7',
      firstName: 'Ana',
      lastName: 'Martínez',
      email: 'ana.martinez@example.com',
      password: 'Passw0rd!',
      active: true,
      isSuperAdmin: false,
    },
    {
      id: '0b4c8cfb-b82b-4b6d-9125-4903d130d4e4',
      firstName: 'Luis',
      lastName: 'Fernández',
      email: 'luis.fernandez@example.com',
      password: 'MySecur3P@ss',
      active: true,
      isSuperAdmin: false,
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
      isSuperAdmin: false,
    };
    this.users.push(user);
    return user;
  }

  findOneByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
