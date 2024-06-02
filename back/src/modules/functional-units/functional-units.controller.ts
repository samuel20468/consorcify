import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FunctionalUnitsService } from './functional-units.service';
import { CreateFunctionalUnitDto } from './dto/create-functional-unit.dto';
import { UpdateFunctionalUnitDto } from './dto/update-functional-unit.dto';
import { FunctionalUnit } from './entities/functional-unit.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('functional-units')
@UseGuards(AuthGuard)
export class FunctionalUnitsController {
  constructor(
    private readonly functionalUnitsService: FunctionalUnitsService,
  ) {}

  @Post()
  async create(
    @Body() createFunctionalUnitDto: CreateFunctionalUnitDto,
  ): Promise<FunctionalUnit> {
    return await this.functionalUnitsService.create(createFunctionalUnitDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<FunctionalUnit[]> {
    return await this.functionalUnitsService.findAll(+page, +limit);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FunctionalUnit> {
    const functionalUnit = await this.functionalUnitsService.findOne(id);
    if (!functionalUnit) {
      throw new NotFoundException(`Functional unit with id ${id} not found`);
    }
    return functionalUnit;
  }

  @Get('consortium/:consortiumId')
  async findByConsortium(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Param('consortiumId', ParseUUIDPipe) consortiumId: string,
  ): Promise<FunctionalUnit[]> {
    const functionalUnits = await this.functionalUnitsService.findByConsortium(
      consortiumId,
      +page,
      +limit,
    );
    if (functionalUnits.length === 0) {
      throw new NotFoundException(
        `Functional units with consortium ${consortiumId} not found`,
      );
    }
    return functionalUnits;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFunctionalUnitDto: UpdateFunctionalUnitDto,
  ): Promise<FunctionalUnit> {
    return await this.functionalUnitsService.update(
      id,
      updateFunctionalUnitDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.functionalUnitsService.remove(+id);
  }
}
