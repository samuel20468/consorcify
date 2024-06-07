import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FunctionalUnitsExpense } from './entities/functional-units-expense.entity';
import { Expense } from '../expenses/entities/expense.entity';
import checkEntityExistence from 'src/helpers/check-entity-existence.helper';
import { CreateFunctionalUnitsExpenseDto } from './dto/create-functional-units-expense.dto';
import { FunctionalUnit } from '../functional-units/entities/functional-unit.entity';

@Injectable()
export class FunctionalUnitsExpensesRepository {
  constructor(
    @InjectRepository(FunctionalUnitsExpense)
    private functionalUnitsExpensesRepository: Repository<FunctionalUnitsExpense>,
    @InjectRepository(Expense) private expensesRepository: Repository<Expense>,
    @InjectRepository(FunctionalUnit)
    private functionalUnitsRepository: Repository<FunctionalUnit>,
  ) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<FunctionalUnitsExpense[]> {
    return await this.functionalUnitsExpensesRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['expense', 'functional_unit'],
    });
  }

  async findOne(id: string): Promise<FunctionalUnitsExpense> {
    return await this.functionalUnitsExpensesRepository.findOne({
      where: { id },
      relations: ['expense', 'functional_unit'],
    });
  }

  async create(
    createFunctionalUnitsExpenseDto: CreateFunctionalUnitsExpenseDto,
  ): Promise<FunctionalUnitsExpense> {
    const foundExpense: Expense = await checkEntityExistence(
      this.expensesRepository,
      createFunctionalUnitsExpenseDto.expense_id,
      'la expensa',
    );

    const foundFunctionalUnit: FunctionalUnit = await checkEntityExistence(
      this.functionalUnitsRepository,
      createFunctionalUnitsExpenseDto.functional_unit_id,
      'la unidad funcional',
    );

    const functionalUnitsExpense: FunctionalUnitsExpense =
      new FunctionalUnitsExpense();
    functionalUnitsExpense.expense = foundExpense;
    functionalUnitsExpense.functional_unit = foundFunctionalUnit;
    functionalUnitsExpense.monthly_expenditure =
      createFunctionalUnitsExpenseDto.monthly_expenditure;
    functionalUnitsExpense.interests =
      createFunctionalUnitsExpenseDto.interests;
    functionalUnitsExpense.previous_balance =
      createFunctionalUnitsExpenseDto.previous_balance;
    functionalUnitsExpense.total_amount =
      createFunctionalUnitsExpenseDto.total_amount;

    return await this.functionalUnitsExpensesRepository.save(
      functionalUnitsExpense,
    );
  }
}
