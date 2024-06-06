import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExpendituresService } from './expenditures.service';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Expenditure } from './entities/expenditure.entity';

@ApiTags('Expenditures')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('expenditures')
export class ExpendituresController {
  constructor(private readonly expendituresService: ExpendituresService) {}

  @Post()
  async create(@Body() createExpenditureDto: CreateExpenditureDto): Promise<Expenditure> {
    return await this.expendituresService.create(createExpenditureDto);
  }

  @Get()
  findAll() {
    return this.expendituresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expendituresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenditureDto: UpdateExpenditureDto) {
    return this.expendituresService.update(+id, updateExpenditureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expendituresService.remove(+id);
  }
}
