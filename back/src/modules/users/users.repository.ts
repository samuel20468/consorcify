import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findAll(page: number, limit: number): Promise<User[]> {
    const users = this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    })
    return users;
  }
  async findOne(id: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    if (updateUserDto.email) {
      const userWithEmail = await this.usersRepository.findOne({ where: { email: updateUserDto.email } });
      if (userWithEmail && userWithEmail.id !== id) {
        throw new BadRequestException(`User with email ${updateUserDto.email} already exists`);
      }
    }

    return await this.usersRepository.save({ ...user, ...updateUserDto });
  }

  // async toggleStatus(id: string, status: boolean) {
  //   throw new Error('Method not implemented.');
  // }
}
