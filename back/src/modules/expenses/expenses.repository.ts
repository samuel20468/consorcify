import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { EXPENSE_STATUS } from 'src/utils/constants';
import { FunctionalUnit } from '../functional-units/entities/functional-unit.entity';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { Expenditure } from '../expenditures/entities/expenditure.entity';
import { FunctionalUnitsExpensesRepository } from '../functional-units-expenses/functional-units-expenses.repository';
import { FunctionalUnitExpense } from '../functional-units-expenses/entities/functional-units-expense.entity';

@Injectable()
export class ExpensesRepository {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    @InjectRepository(Consortium)
    private readonly consortiumRepository: Repository<Consortium>,
    private readonly functionalUnitsExpensesRepository: FunctionalUnitsExpensesRepository,
    @InjectRepository(FunctionalUnit)
    private readonly functionalUnitRepository: Repository<FunctionalUnit>,
  ) {}

  async createExpense(newExpense: Expense) {
    return this.expenseRepository.save(newExpense);
  }

  async findAll(): Promise<Expense[]> {
    return await this.expenseRepository.find({
      where: { active: true },
      relations: { consortium: true, expenditures: true },
    });
  }

  async findOne(id: string): Promise<Expense> {
    return await this.expenseRepository.findOne({
      where: { id, active: true },
      relations: {
        expenditures: true,
        consortium: true,
        functional_units_expenses: true,
      },
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

    const monthly_expenditure: number =
      expenseToSettle.total_amount / foundConsortium.ufs;

    const consortiumInterestRate: number = foundConsortium.interest_rate;

    const promises = functionalUnits.map(async (uf) => {
      let interests: number = 0;
      let previous_balance: number = uf.balance;
      if (previous_balance > 0) {
        interests = (previous_balance * consortiumInterestRate) / 100;
      }

      let total_amount: number =
        previous_balance + interests + monthly_expenditure;

      const functionalUnitExpense: Omit<FunctionalUnitExpense, 'id'> = {
        monthly_expenditure,
        interests,
        previous_balance,
        total_amount,
        expense: expenseToSettle,
        functional_unit: uf,
      };

      uf.balance = total_amount;

      await this.functionalUnitRepository.save(uf);

      await this.functionalUnitsExpensesRepository.create(
        functionalUnitExpense,
      );
    });

    await Promise.all(promises);

    const finalExpense: Expense = await this.expenseRepository.findOne({
      where: { id: expenseToSettle.id, active: true },
      relations: { expenditures: { supplier: true }, functional_units_expenses: { functional_unit: true } },
    });

    return finalExpense;
  }
}
