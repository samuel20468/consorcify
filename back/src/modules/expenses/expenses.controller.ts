import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Expense } from './entities/expense.entity';
import { STATUS_MESSAGE } from 'src/utils/constants';

@ApiTags('Expenses')
@Controller('expenses')
@ApiBearerAuth()
// @UseGuards(AuthCustomGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return await this.expensesService.create(createExpenseDto);
  }

  @Post(':id/settle')
  async settleExpense(@Param('id', ParseUUIDPipe) id: string) {
    return await this.expensesService.settleExpense(id);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ): Promise<Expense[]> {
    return await this.expensesService.findAll({ page, limit });
  }

  @Get('consortium/:consortiumId')
  @ApiResponse({ status: 200, type: Expense })
  @ApiResponse({
    status: 409,
    description: 'El Consorcio id ${consortiumId} no existe',
  })
  @ApiResponse({
    status: 409,
    description:
      'El Consorcio "${consortium.name}" no tiene una expensa abierta',
  })
  async findAllByConsortium(
    @Param('consortiumId', ParseUUIDPipe) consortiumId: string,
  ): Promise<Expense[]> {
    return await this.expensesService.findAllByConsortium(consortiumId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.expensesService.findOne(id);
  }

  @Patch(':id/undo')
  async undoExpense(@Param('id', ParseUUIDPipe) id: string) {
    const expense: Expense = await this.expensesService.undoExpense(id);
    return {
      response: `La expensa con id: ${expense.id} fue exitosamente deshecha`,
    };
  }

  @Patch(':id/close-expense')
  async closeExpense(@Param('id', ParseUUIDPipe) id: string) {
    return await this.expensesService.closeExpense(id);
  }

  @Patch('toggle-status/:id')
  async toggleStatus(@Param('id', ParseUUIDPipe) id: string) {
    let statusMessage: string;

    const expenseToggled: Expense = await this.expensesService.toggleStatus(id);

    !expenseToggled.active //Se niega porque el service devuelve el objeto antes de ser modificado - Ln 55 en el service
      ? (statusMessage = STATUS_MESSAGE.ACTIVATED)
      : (statusMessage = STATUS_MESSAGE.DISABLED);

    return {
      message: `Expense with id ${expenseToggled.id} has been ${statusMessage}`,
    };
  }
}
