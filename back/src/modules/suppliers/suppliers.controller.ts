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

import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { ROLE } from 'src/utils/constants';
import { RolesGuard } from 'src/guards/roles.guard';
import { Supplier } from './entities/supplier.entity';
import { STATUS } from 'src/utils/constants';


@UseGuards(AuthGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @Roles(ROLE.CADMIN)
  @UseGuards(RolesGuard)
  async createSupplier(@Body() newSupplier: CreateSupplierDto) {
    return await this.suppliersService.createSupplier(newSupplier);
  }

  @Get()
  @Roles(ROLE.CADMIN)
  @UseGuards(RolesGuard)
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return await this.suppliersService.findAll({ page, limit });
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.suppliersService.findOne(id);
  }

  @Put(':id')
  async updateSupplier(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() supplierToUpdate: CreateSupplierDto,
  ) {
    return await this.suppliersService.updateSupplier(id, supplierToUpdate);
  }

  @Patch('toggle-status/:id')
  async toggleStatus(@Param('id', ParseUUIDPipe) id: string) {
    let statusMessage: string;

    const supplierToggled: Supplier =
      await this.suppliersService.toggleStatus(id);

    !supplierToggled.active //Se niega porque el service devuelve el objeto antes de ser modificado - Ln 55 en el service
      ? (statusMessage = STATUS.ACTIVATED)
      : (statusMessage = STATUS.DISABLED);

    return {
      message: `Supplier with id ${supplierToggled.id} has been ${statusMessage}`,
    };
  }
}
