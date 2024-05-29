import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CAdminService } from './c-admin.service';
import { CreateCAdminDto } from './dto/create-c-admin.dto';
import { UpdateCAdminDto } from './dto/update-c-admin.dto';

@Controller('c-admin')
export class CAdminController {
  constructor(private readonly cAdminService: CAdminService) {}

  @Post()
  create(@Body() createCAdminDto: CreateCAdminDto) {
    return this.cAdminService.create(createCAdminDto);
  }

  @Get()
  findAll() {
    return this.cAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cAdminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCAdminDto: UpdateCAdminDto) {
    return this.cAdminService.update(+id, updateCAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cAdminService.remove(+id);
  }
}
