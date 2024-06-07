import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { EXPENSE_STATUS } from 'src/utils/constants';
import { FunctionalUnit } from '../functional-units/entities/functional-unit.entity';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { Expenditure } from '../expenditures/entities/expenditure.entity';

@Injectable()
export class ExpensesRepository {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    @InjectRepository(Consortium)
    private readonly consortiumRepository: Repository<Consortium>,
  ) {}

  async createExpense(newExpense: Expense) {
    return this.expenseRepository.save(newExpense);
  }

  async findAll(): Promise<Expense[]> {
    return await this.expenseRepository.find({
      where: { active: true },
      relations: { consortium: true },
    });
  }

  async findOne(id: string): Promise<Expense> {
    return await this.expenseRepository.findOne({
      where: { id, active: true },
      relations: { consortium: true, expenditures: true },
    });
  }

  async closeExpense(id: string): Promise<void> {
    await this.expenseRepository.update(id, { status: EXPENSE_STATUS.CLOSED });
  }

  async settleExpense(expenseToSettle: Expense) {
    const { consortium } = expenseToSettle;
    const foundConsortium: Consortium = await this.consortiumRepository.findOne(
      {
        where: { id: consortium.id },
        relations: { functional_units: true },
      },
    );

    const functionalUnits: FunctionalUnit[] = foundConsortium.functional_units;

    if (!functionalUnits || functionalUnits.length === 0)
      throw new ConflictException(
        'No se puede liquidar una expensa sin unidades funcionales',
      );

    const expenseExpenditures: Expenditure[] = expenseToSettle.expenditures;

    if (!expenseExpenditures || expenseExpenditures.length === 0)
      throw new ConflictException(
        'No se puede liquidar una expensa sin gastos',
      );

    const totalExpendituresInExpense: number = expenseExpenditures.reduce(
      (acum, exp) => acum + exp.total_amount,
      0,
    );

    expenseToSettle.total_amount = totalExpendituresInExpense;

    const monthly_expenditure: number =
      totalExpendituresInExpense / foundConsortium.ufs;
  }
}
