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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConsortiumsService } from './consortiums.service';
import { CreateConsortiumDto } from './dto/create-consortium.dto';
import { UpdateConsortiumDto } from './dto/update-consortium.dto';
import { AuthCustomGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExcludeActiveInterceptor } from 'src/interceptors/exclude-active.interceptor';

@ApiTags('Consortium')
@Controller('consortiums')
@ApiBearerAuth()
@UseGuards(AuthCustomGuard)
@UseInterceptors(ExcludeActiveInterceptor)
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
    return this.consortiumsService.findAll(1, 5);
  }

  @Get('cadmin/:id')
  findAllByCAdmin(@Param('id', ParseUUIDPipe) id: string) {
    return this.consortiumsService.findAllByCAdmin(id);
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

  @Patch('disable/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.consortiumsService.remove(id);
  }
}
