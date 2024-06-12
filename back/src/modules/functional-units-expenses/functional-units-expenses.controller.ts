import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { FunctionalUnitsExpensesService } from './functional-units-expenses.service';
import { CreateFunctionalUnitsExpenseDto } from './dto/create-functional-units-expense.dto';
import { UpdateFunctionalUnitsExpenseDto } from './dto/update-functional-units-expense.dto';
import { FunctionalUnitExpense } from './entities/functional-units-expense.entity';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthCustomGuard } from 'src/guards/auth.guard';

@ApiTags('Functional Units Expenses')
@ApiBearerAuth()
@UseGuards(AuthCustomGuard)
@Controller('functional-units-expenses')
export class FunctionalUnitsExpensesController {
  constructor(
    private readonly functionalUnitsExpensesService: FunctionalUnitsExpensesService,
  ) {}

  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<FunctionalUnitExpense[]> {
    return await this.functionalUnitsExpensesService.findAll(+page, +limit);
  }

  @Get(':id/user')
  async findAllByUser(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FunctionalUnitExpense[]> {
    page = page ?? 1;
    limit = limit ?? 5;

    return await this.functionalUnitsExpensesService.findAllByUser(
      page,
      limit,
      id,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.functionalUnitsExpensesService.findOne(id);
  }
}
