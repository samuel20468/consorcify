import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFunctionalUnitsExpenseDto } from './dto/create-functional-units-expense.dto';
import { UpdateFunctionalUnitsExpenseDto } from './dto/update-functional-units-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FunctionalUnitsExpensesRepository } from './functional-units-expenses.repository';
import { FunctionalUnitExpense } from './entities/functional-units-expense.entity';
import checkEntityExistence from 'src/helpers/check-entity-existence.helper';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class FunctionalUnitsExpensesService {
  constructor(
    private readonly functionalUnitsExpensesRepository: FunctionalUnitsExpensesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAll(page: number, limit: number): Promise<FunctionalUnitExpense[]> {
    return await this.functionalUnitsExpensesRepository.findAll(page, limit);
  }

  async findAllByUser(
    page: number,
    limit: number,
    userId: string,
  ): Promise<FunctionalUnitExpense[]> {
    if (!userId) {
      throw new BadRequestException('id is required');
    }

    const user: User = await checkEntityExistence(
      this.usersRepository,
      userId,
      'el usuario',
    );

    const expenses: FunctionalUnitExpense[] =
      await this.functionalUnitsExpensesRepository.findAllByUser(user);

    if (expenses.length === 0)
      throw new NotFoundException('No functional unit expenses found');

    return expenses;
  }

  async findOne(id: string): Promise<FunctionalUnitExpense> {
    return await this.functionalUnitsExpensesRepository.findOne(id);
  }

  // async findAmountByUser(userId: string) {

  // }
}
