import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FunctionalUnitExpense } from './entities/functional-units-expense.entity';
@Injectable()
export class FunctionalUnitsExpensesRepository {
  constructor(
    @InjectRepository(FunctionalUnitExpense)
    private functionalUnitsExpensesRepository: Repository<FunctionalUnitExpense>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 5,
  ): Promise<FunctionalUnitExpense[]> {
    return await this.functionalUnitsExpensesRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['expense', 'functional_unit'],
    });
  }

  async findOne(id: string): Promise<FunctionalUnitExpense> {
    return await this.functionalUnitsExpensesRepository.findOne({
      where: { id },
      relations: ['expense', 'functional_unit'],
    });
  }

  async create(
    newFunctionalUnitExpense: Omit<FunctionalUnitExpense, 'id'>,
  ): Promise<FunctionalUnitExpense> {
    const {
      monthly_expenditure,
      previous_balance,
      interests,
      total_amount,
      expense,
      functional_unit,
    } = newFunctionalUnitExpense;

    const functionalUnitsExpense: FunctionalUnitExpense =
      new FunctionalUnitExpense();
    functionalUnitsExpense.expense = expense;
    functionalUnitsExpense.functional_unit = functional_unit;
    functionalUnitsExpense.monthly_expenditure = monthly_expenditure;
    functionalUnitsExpense.interests = interests;
    functionalUnitsExpense.previous_balance = previous_balance;
    functionalUnitsExpense.total_amount = total_amount;

    return await this.functionalUnitsExpensesRepository.save(
      functionalUnitsExpense,
    );
  }
}
