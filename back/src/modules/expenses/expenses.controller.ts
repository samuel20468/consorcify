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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Expense } from './entities/expense.entity';

@ApiTags('Expenses')
@Controller('expenses')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.expensesService.findOne(id);
  }

  @Patch(':id/close-expense')
  closeExpense(@Param('id', ParseUUIDPipe) id: string) {
    return this.expensesService.closeExpense(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
