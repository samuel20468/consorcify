import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsortiumsService } from './consortiums.service';
import { CreateConsortiumDto } from './dto/create-consortium.dto';
import { UpdateConsortiumDto } from './dto/update-consortium.dto';

@Controller('consortiums')
export class ConsortiumsController {
  constructor(private readonly consortiumsService: ConsortiumsService) {}

  @Post()
  create(@Body() createConsortiumDto: CreateConsortiumDto) {
    return this.consortiumsService.create(createConsortiumDto);
  }

  @Get()
  findAll() {
    return this.consortiumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consortiumsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsortiumDto: UpdateConsortiumDto) {
    return this.consortiumsService.update(+id, updateConsortiumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consortiumsService.remove(+id);
  }
}
