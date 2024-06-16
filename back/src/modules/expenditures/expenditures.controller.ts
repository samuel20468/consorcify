import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ExpendituresService } from './expenditures.service';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthCustomGuard } from 'src/guards/auth.guard';
import { Expenditure } from './entities/expenditure.entity';

@ApiTags('Expenditures')
@ApiBearerAuth()
@UseGuards(AuthCustomGuard)
@Controller('expenditures')
export class ExpendituresController {
  constructor(private readonly expendituresService: ExpendituresService) {}

  @Post()
  async create(
    @Body() createExpenditureDto: CreateExpenditureDto,
  ): Promise<Expenditure> {
    return await this.expendituresService.create(createExpenditureDto);
  }

  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<Expenditure[]> {
    if (!page || page < 1 || isNaN(page)) {
      page = 1;
    }

    if (!limit || limit < 1 || isNaN(limit)) {
      limit = 5;
    }
    return await this.expendituresService.findAll(+page, +limit);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Expenditure> {
    const expenditure = await this.expendituresService.findOne(id);
    if (!expenditure) {
      throw new NotFoundException(`Gasto con id ${id} no encontrado`);
    }
    return expenditure;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateExpenditureDto: UpdateExpenditureDto,
  ): Promise<Expenditure> {
    return await this.expendituresService.update(id, updateExpenditureDto);
  }

  @Patch('disable/:id')
  async disable(@Param('id', ParseUUIDPipe) id: string): Promise<Expenditure> {
    return await this.expendituresService.disable(id);
  }
}
