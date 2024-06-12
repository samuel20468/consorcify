import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesRepository } from './expenses.repository';
import { Consortium } from '../consortiums/entities/consortium.entity';
import checkEntityExistence from 'src/helpers/check-entity-existence.helper';
import { ConsortiumsService } from '../consortiums/consortiums.service';
import { Expense } from './entities/expense.entity';
import { TPagination } from 'src/utils/types';
import { EXPENSE_STATUS } from 'src/utils/constants';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly expensesRepository: ExpensesRepository,
    private readonly consortiumsService: ConsortiumsService,
  ) {}

  async create(expenseToCreate: CreateExpenseDto) {
    const { name, issue_date, expiration_date, consortium_id } =
      expenseToCreate;

    const foundConsortium: Consortium = await checkEntityExistence(
      this.consortiumsService,
      consortium_id,
      'el Consorcio',
    );

    const newExpense: Expense = new Expense();
    newExpense.name = name;
    newExpense.issue_date = issue_date;
    newExpense.expiration_date = expiration_date;
    newExpense.consortium = foundConsortium;

    return await this.expensesRepository.createExpense(newExpense);
  }
  async findAll({ page, limit }: TPagination): Promise<Expense[]> {
    const expenses: Expense[] = await this.expensesRepository.findAll();

    if (expenses.length == 0) throw new NotFoundException('No expenses found');

    page = Math.max(1, page);

    limit = Math.max(1, limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return expenses.slice(startIndex, endIndex);
  }

  async findOne(id: string): Promise<Expense> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const expense: Expense = await checkEntityExistence(
      this.expensesRepository,
      id,
      'la expensa',
    );

    return expense;
  }

  async closeExpense(id: string): Promise<Expense> {
    const foundExpense: Expense = await this.findOne(id);

    if (foundExpense.status === EXPENSE_STATUS.CLOSED)
      throw new ConflictException(
        'No se puede cerrar una expensa que ya se encuentra cerrada',
      );

    await this.expensesRepository.closeExpense(id);

    foundExpense.status = EXPENSE_STATUS.CLOSED;

    return foundExpense;
  }

  async settleExpense(id: string) {
    const foundExpense: Expense = await this.findOne(id);

    if (foundExpense.status === EXPENSE_STATUS.CLOSED)
      throw new ConflictException(
        'No se puede liquidar una expensa que esta cerrada',
      );

    return await this.expensesRepository.settleExpense(foundExpense);
  }

  async toggleStatus(id: string) {
    let status: boolean;

    if (!id) {
      throw new BadRequestException('id is required');
    }

    const foundExpense: Expense = await checkEntityExistence(
      this.expensesRepository,
      id,
      'la expensa',
    );

    status = foundExpense.active;

    await this.expensesRepository.toggleStatus(id, status);

    return foundExpense;
  }
}
