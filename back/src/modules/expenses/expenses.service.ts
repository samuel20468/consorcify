import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesRepository } from './expenses.repository';
import { Consortium } from '../consortiums/entities/consortium.entity';
import checkEntityExistence from 'src/helpers/check-entity-existence.helper';
import { ConsortiumsService } from '../consortiums/consortiums.service';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly expensesRepository: ExpensesRepository,
    private readonly consortiumsService: ConsortiumsService,
  ) {}

  async create(expenseToCreate: CreateExpenseDto) {
    const { issue_date, expiration_date, consortium_id } = expenseToCreate;

    const foundConsortium: Consortium = await checkEntityExistence(
      this.consortiumsService,
      consortium_id,
      'el Consorcio',
    );

    const newExpense: Expense = new Expense()
    newExpense.issue_date = issue_date;
    newExpense.expiration_date = expiration_date;
    newExpense.consortium = foundConsortium;
    
    return await this.expensesRepository.createExpense(newExpense);
  }

  findAll() {
    return `This action returns all expenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
