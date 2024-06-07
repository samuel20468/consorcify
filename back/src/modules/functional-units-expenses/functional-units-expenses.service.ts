import { Injectable } from '@nestjs/common';
import { CreateFunctionalUnitsExpenseDto } from './dto/create-functional-units-expense.dto';
import { UpdateFunctionalUnitsExpenseDto } from './dto/update-functional-units-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FunctionalUnitsExpensesRepository } from './functional-units-expenses.repository';
import { FunctionalUnitsExpense } from './entities/functional-units-expense.entity';

@Injectable()
export class FunctionalUnitsExpensesService {

  constructor(private readonly functionalUnitsExpensesRepository: FunctionalUnitsExpensesRepository) { }
  async create(newFunctionalUnitsExpenseDto: CreateFunctionalUnitsExpenseDto): Promise<FunctionalUnitsExpense> {
    return await this.functionalUnitsExpensesRepository.create(newFunctionalUnitsExpenseDto);
  }

  async findAll(page: number, limit: number): Promise<FunctionalUnitsExpense[]> {
    return await this.functionalUnitsExpensesRepository.findAll(page, limit);
  }

  async findOne(id: string): Promise<FunctionalUnitsExpense> {
    return await this.functionalUnitsExpensesRepository.findOne(id);
  }
}
