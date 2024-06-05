import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpendituresService } from './expenditures.service';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';

@Controller('expenditures')
export class ExpendituresController {
  constructor(private readonly expendituresService: ExpendituresService) {}

  @Post()
  create(@Body() createExpenditureDto: CreateExpenditureDto) {
    return this.expendituresService.create(createExpenditureDto);
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
