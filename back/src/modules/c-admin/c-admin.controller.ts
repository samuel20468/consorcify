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
