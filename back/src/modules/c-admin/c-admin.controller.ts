import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { CAdminsService } from './c-admin.service';
import { CreateCAdminDto } from './dto/create-c-admin.dto';
import { UpdateCAdminDto } from './dto/update-c-admin.dto';
import { CAdmin } from './entities/c-admin.entity';

@Controller('c-admins')
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
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CAdmin> {
    return await this.cAdminsService.findOne(id);
  }

  @Put(':id')
  async updateCAdmin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() cAdminToUpdate: CreateCAdminDto,
  ): Promise<CAdmin> {
    return await this.cAdminsService.updateCAdmin(id, cAdminToUpdate);
  }

  @Patch('disable/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<CAdmin> {
    const cAdminDisabled: CAdmin = await this.cAdminsService.delete(id);

    cAdminDisabled.active = false;

    return cAdminDisabled;
  }
}
