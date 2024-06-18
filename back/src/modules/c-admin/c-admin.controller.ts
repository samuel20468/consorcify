import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  ParseUUIDPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CAdminsService } from './c-admin.service';
import { CreateCAdminDto } from './dto/create-c-admin.dto';
import { CAdmin } from './entities/c-admin.entity';
import { ExcludePasswordInterceptor } from 'src/interceptors/exclude-password.interceptor';
import { ExcludeActiveInterceptor } from 'src/interceptors/exclude-active.interceptor';
import { AuthCustomGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateCAdminDto } from './dto/update-c-admin.dto';
import { UpdatePassDto } from './dto/udpate-pass.dto';
import { Roles } from 'src/decorators/role.decorator';
import { ROLE } from 'src/utils/constants';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Consortium Admin')
@Controller('c-admins')
@ApiBearerAuth()
@UseGuards(AuthCustomGuard)
@UseInterceptors(ExcludePasswordInterceptor)
export class CAdminsController {
  constructor(private readonly cAdminsService: CAdminsService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<CAdmin[]> {
    return await this.cAdminsService.findAll({ page, limit });
  }

  @Get(':id')
  @UseInterceptors(ExcludeActiveInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CAdmin> {
    return await this.cAdminsService.findOne(id);
  }

  @Patch('update-password/:id')
  @Roles(ROLE.CADMIN)
  @UseGuards(RolesGuard)
  async updatePassCAdmin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() passToUpdate: UpdatePassDto,
  ): Promise<void> {
    return await this.cAdminsService.updatePassCAdmin(id, passToUpdate);
  }

  @Patch(':id')
  @UseInterceptors(ExcludeActiveInterceptor)
  async updateCAdmin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() cAdminToUpdate: UpdateCAdminDto,
  ): Promise<CAdmin> {
    return await this.cAdminsService.updateCAdmin(id, cAdminToUpdate);
  }

  @Patch('disable/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<CAdmin> {
    const cAdminDisabled: CAdmin = await this.cAdminsService.delete(id);

    cAdminDisabled.active = false;

    return cAdminDisabled;
  }
}
