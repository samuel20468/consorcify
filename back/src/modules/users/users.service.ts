import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(page: number, limit: number): Promise<User[]> {
    return await this.usersRepository.findAll(page, limit);
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  // async toggleStatus(id: string): Promise<User> {
  //   let status: boolean;
  //   const user = await this.usersRepository.findOne(id);
  //   if (!user) {
  //     throw new NotFoundException(`User with id ${id} not found`);
  //   }
  //   status = user.active;
  //   await this.usersRepository.toggleStatus(id, status);
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
