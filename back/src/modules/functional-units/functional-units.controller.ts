import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FunctionalUnitsService } from './functional-units.service';
import { CreateFunctionalUnitDto } from './dto/create-functional-unit.dto';
import { UpdateFunctionalUnitDto } from './dto/update-functional-unit.dto';

@Controller('functional-units')
export class FunctionalUnitsController {
  constructor(private readonly functionalUnitsService: FunctionalUnitsService) {}

  @Post()
  create(@Body() createFunctionalUnitDto: CreateFunctionalUnitDto) {
    return this.functionalUnitsService.create(createFunctionalUnitDto);
  }

  @Get()
  findAll() {
    return this.functionalUnitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.functionalUnitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFunctionalUnitDto: UpdateFunctionalUnitDto) {
    return this.functionalUnitsService.update(+id, updateFunctionalUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.functionalUnitsService.remove(+id);
  }
}
