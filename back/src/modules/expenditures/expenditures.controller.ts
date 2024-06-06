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
import { AuthGuard } from 'src/guards/auth.guard';
import { Expenditure } from './entities/expenditure.entity';

@ApiTags('Expenditures')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
  @Get('consortium/:consortiumId')
  async findAllByConsortium(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Param('consortiumId', ParseUUIDPipe) consortiumId: string,
  ): Promise<Expenditure[]> {
    return await this.expendituresService.findAllByConsortium(
      consortiumId,
      +page,
      +limit,
    );
  }

  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @Get('consortium/unpaid/:consortiumId')
  async findAllUnpaidByConsortium(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Param('consortiumId', ParseUUIDPipe) consortiumId: string,
  ): Promise<Expenditure[]> {
    return await this.expendituresService.findAllUnpaidByConsortium(
      consortiumId,
      +page,
      +limit,
    );
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
