import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { ROLE } from 'src/utils/constants';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards(AuthGuard)
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @Roles(ROLE.CADMIN)
  @UseGuards(RolesGuard)
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  @Roles(ROLE.CADMIN)
  @UseGuards(RolesGuard)
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.providersService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.providersService.findOne(id);
  }

  @Put(':id')
  updateProvider(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providersService.updateProvider(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(+id);
  }
}
