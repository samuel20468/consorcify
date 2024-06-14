import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthCustomGuard } from 'src/guards/auth.guard';
import { Expense } from './entities/expense.entity';
import { STATUS_MESSAGE } from 'src/utils/constants';

@ApiTags('Expenses')
@Controller('expenses')
@ApiBearerAuth()
@UseGuards(AuthCustomGuard)
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
    @Query('limit') limit: number = 5,
  ): Promise<Expense[]> {
    return await this.expensesService.findAll({ page, limit });
  }

  @Get('open/:consortiumId')
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
  async findOpenByConsortium(
    @Param('consortiumId', ParseUUIDPipe) consortiumId: string,
  ): Promise<Expense> {
    return await this.expensesService.findOpenByConsortium(consortiumId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.expensesService.findOne(id);
  }

  @Patch(':id/close-expense')
  closeExpense(@Param('id', ParseUUIDPipe) id: string) {
    return this.expensesService.closeExpense(id);
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
