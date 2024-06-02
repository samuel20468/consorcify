import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<User[]> {
    return await this.usersService.findAll(+page, +limit);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User | undefined> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  // @Patch('toggle-status/:id')
  // async toggleStatus(@Param('id', ParseUUIDPipe) id: string) {
  //   let statusMessage: string;

  //   const userToggled: User = await this.usersService.toggleStatus(id);

  //   !userToggled.active
  //     ? (statusMessage = 'Activated')
  //     : (statusMessage = 'Disabled');
  
  //   return {
  //     message: `User with id ${userToggled.id} has been ${statusMessage}`,
  //   }
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
