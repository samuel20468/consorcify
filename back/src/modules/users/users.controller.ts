import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ExcludePasswordInterceptor } from 'src/interceptors/exclude-password.interceptor';
import { ExcludeActiveInterceptor } from 'src/interceptors/exclude-active.interceptor';
import { ExcludeSuperAdminInterceptor } from 'src/interceptors/exclude-super-admin.interceptor';
import { AuthCustomGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { ROLE } from 'src/utils/constants';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePassDto } from '../c-admin/dto/udpate-pass.dto';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthCustomGuard)
@UseInterceptors(ExcludePasswordInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(ROLE.CADMIN, ROLE.SUPERADMIN)
  @UseGuards(RolesGuard)
  @UseInterceptors(ExcludeActiveInterceptor)
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<User[]> {
    return await this.usersService.findAll(+page, +limit);
  }

  @Get(':id')
  @UseInterceptors(ExcludeActiveInterceptor, ExcludeSuperAdminInterceptor)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<User | undefined> {
    return await this.usersService.findOne(id);
  }

  @Patch('update-password/:id')
  @Roles(ROLE.USER)
  @UseGuards(RolesGuard)
  async updatePassCAdmin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() passToUpdate: UpdatePassDto,
  ): Promise<void> {
    return await this.usersService.updatePassUser(id, passToUpdate);
  }

  @Patch(':id')
  @UseInterceptors(ExcludeActiveInterceptor, ExcludeSuperAdminInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Patch('toggle-status/:id')
  async toggleStatus(@Param('id', ParseUUIDPipe) id: string) {
    let statusMessage: string;

    const userToggled: User = await this.usersService.toggleStatus(id);

    userToggled.active
      ? (statusMessage = 'Activado')
      : (statusMessage = 'Desactivado');

    return {
      message: `El usuario con el id ${userToggled.id} ha sido ${statusMessage}`,
    };
  }
}
