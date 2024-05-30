import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ConsortiumsService } from './consortiums.service';
import { CreateConsortiumDto } from './dto/create-consortium.dto';
import { UpdateConsortiumDto } from './dto/update-consortium.dto';

@Controller('consortiums')
export class ConsortiumsController {
  constructor(private readonly consortiumsService: ConsortiumsService) {}

  @Post()
  create(@Body() consortium: CreateConsortiumDto) {
    return this.consortiumsService.create(consortium);
  }

  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.consortiumsService.findAll(Number(page), Number(limit));
    }
    return this.consortiumsService.findAll(1,5);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.consortiumsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() consortium: UpdateConsortiumDto,
  ) {
    return this.consortiumsService.update(id, consortium);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.consortiumsService.remove(id);
  }
}
