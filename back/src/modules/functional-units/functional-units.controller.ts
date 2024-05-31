import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { FunctionalUnitsService } from './functional-units.service';
import { CreateFunctionalUnitDto } from './dto/create-functional-unit.dto';
import { UpdateFunctionalUnitDto } from './dto/update-functional-unit.dto';
import { FunctionalUnit } from './entities/functional-unit.entity';

@Controller('functional-units')
export class FunctionalUnitsController {
  constructor(private readonly functionalUnitsService: FunctionalUnitsService) {}

  @Post()
  async create(@Body() createFunctionalUnitDto: CreateFunctionalUnitDto): Promise<FunctionalUnit> {
    return await this.functionalUnitsService.create(createFunctionalUnitDto);
  }

  @Get()
  async findAll(): Promise<FunctionalUnit[]> {
    return await this.functionalUnitsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<FunctionalUnit> {
    const functionalUnit = await this.functionalUnitsService.findOne(id);
    if (!functionalUnit) {
      throw new NotFoundException(`Functional unit with id ${id} not found`);
    }
    return functionalUnit;
  }

  @Get('consortium/:consortiumId')
  async findByConsortium(@Param('consortiumId', ParseUUIDPipe) consortiumId: string): Promise<FunctionalUnit[]> {
    return await this.functionalUnitsService.findByConsortium(consortiumId);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateFunctionalUnitDto: UpdateFunctionalUnitDto): Promise<FunctionalUnit> {
    return await this.functionalUnitsService.update(id, updateFunctionalUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.functionalUnitsService.remove(+id);
  }
}
