import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  Put,
  Patch,
  UseGuards,
  } from '@nestjs/common';

import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { ROLE } from 'src/utils/constants';
import { RolesGuard } from 'src/guards/roles.guard';
import { Provider } from './entities/provider.entity';
import { STATUS } from 'src/utils/constants';


@UseGuards(AuthGuard)
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @Roles(ROLE.CADMIN)
  @UseGuards(RolesGuard)
  async createProvider(@Body() newProvider: CreateProviderDto) {
    return await this.providersService.createProvider(newProvider);
  }

  @Get()
  @Roles(ROLE.CADMIN)
  @UseGuards(RolesGuard)
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return await this.providersService.findAll({ page, limit });
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.providersService.findOne(id);
  }

  @Put(':id')
  async updateProvider(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() providerToUpdate: CreateProviderDto,
  ) {
    return await this.providersService.updateProvider(id, providerToUpdate);
  }

  @Patch('toggle-status/:id')
  async toggleStatus(@Param('id', ParseUUIDPipe) id: string) {
    let statusMessage: string;

    const providerToggled: Provider =
      await this.providersService.toggleStatus(id);

    !providerToggled.active //Se niega porque el service devuelve el objeto antes de ser modificado - Ln 55 en el service
      ? (statusMessage = STATUS.ACTIVATED)
      : (statusMessage = STATUS.DISABLED);

    return {
      message: `Provider with id ${providerToggled.id} has been ${statusMessage}`,
    };
  }
}
