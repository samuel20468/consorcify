import { Injectable } from '@nestjs/common';
import { CreateFunctionalUnitsExpenseDto } from './dto/create-functional-units-expense.dto';
import { UpdateFunctionalUnitsExpenseDto } from './dto/update-functional-units-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FunctionalUnitsExpensesRepository } from './functional-units-expenses.repository';
import { FunctionalUnitExpense } from './entities/functional-units-expense.entity';

@Injectable()
export class FunctionalUnitsExpensesService {

  constructor(private readonly functionalUnitsExpensesRepository: FunctionalUnitsExpensesRepository) { }

  async findAll(page: number, limit: number): Promise<FunctionalUnitExpense[]> {
    return await this.functionalUnitsExpensesRepository.findAll(page, limit);
  }

  async findOne(id: string): Promise<FunctionalUnitExpense> {
    return await this.functionalUnitsExpensesRepository.findOne(id);
  }
}
