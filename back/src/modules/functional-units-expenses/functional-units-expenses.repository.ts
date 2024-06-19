import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FunctionalUnitExpense } from './entities/functional-units-expense.entity';
import { User } from '../users/entities/user.entity';
@Injectable()
export class FunctionalUnitsExpensesRepository {
  constructor(
    @InjectRepository(FunctionalUnitExpense)
    private readonly functionalUnitsExpensesRepository: Repository<FunctionalUnitExpense>,
  ) {}

  async create(
    newFunctionalUnitExpense: Partial<FunctionalUnitExpense>,
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
    functionalUnitsExpense.created_at = new Date();

    return await this.functionalUnitsExpensesRepository.save(
      functionalUnitsExpense,
    );
  }

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

  async findAllByFunctionalUnit(
    functionalUnitId: string,
    page: number = 1,
    limit: number = 5,
  ): Promise<FunctionalUnitExpense[]> {
    return await this.functionalUnitsExpensesRepository
      .createQueryBuilder('functional_unit_expense')
      .innerJoinAndSelect(
        'functional_unit_expense.functional_unit',
        'functional_unit',
      )
      .leftJoinAndSelect('functional_unit_expense.expense', 'expense')
      .where('functional_unit.id = :id', { id: functionalUnitId })
      .orderBy('functional_unit_expense.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async findOne(id: string): Promise<FunctionalUnitExpense> {
    return await this.functionalUnitsExpensesRepository.findOne({
      where: { id },
      relations: [
        'expense',
        'functional_unit',
        'functional_unit.user',
        'expense.expenditures',
        'expense.consortium',
      ],
    });
  }

  async findAllByUser(
    user: User,
    page: number = 1,
    limit: number = 5,
  ): Promise<FunctionalUnitExpense[]> {
    return await this.functionalUnitsExpensesRepository
      .createQueryBuilder('functional_unit_expense')
      .innerJoinAndSelect(
        'functional_unit_expense.functional_unit',
        'functional_unit',
      )
      .innerJoinAndSelect('functional_unit.user', 'user')
      .where('user.id = :id', { id: user.id })
      .orderBy('functional_unit_expense.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async remove(id: string) {
    return await this.functionalUnitsExpensesRepository.delete(id);
  }
}
