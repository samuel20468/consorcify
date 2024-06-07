import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  Patch,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { STATUS_MESSAGE } from 'src/utils/constants';
import { ExcludeActiveInterceptor } from 'src/interceptors/exclude-active.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@ApiTags('Supplier')
@Controller('suppliers')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(ExcludeActiveInterceptor)
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  async createSupplier(@Body() newSupplier: CreateSupplierDto) {
    return await this.suppliersService.createSupplier(newSupplier);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return await this.suppliersService.findAll({ page, limit });
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.suppliersService.findOne(id);
  }

  @Patch(':id')
  async updateSupplier(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() supplierToUpdate: UpdateSupplierDto,
  ) {
    return await this.suppliersService.updateSupplier(id, supplierToUpdate);
  }

  @Patch('toggle-status/:id')
  async toggleStatus(@Param('id', ParseUUIDPipe) id: string) {
    let statusMessage: string;

    const supplierToggled: Supplier =
      await this.suppliersService.toggleStatus(id);

    !supplierToggled.active //Se niega porque el service devuelve el objeto antes de ser modificado - Ln 55 en el service
      ? (statusMessage = STATUS_MESSAGE.ACTIVATED)
      : (statusMessage = STATUS_MESSAGE.DISABLED);

    return {
      message: `Supplier with id ${supplierToggled.id} has been ${statusMessage}`,
    };
  }
}
