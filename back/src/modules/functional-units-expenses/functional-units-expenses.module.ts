import { Module } from '@nestjs/common';
import { FunctionalUnitsExpensesService } from './functional-units-expenses.service';
import { FunctionalUnitsExpensesController } from './functional-units-expenses.controller';
import { FunctionalUnitsExpensesRepository } from './functional-units-expenses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionalUnitExpense } from './entities/functional-units-expense.entity';
import { FunctionalUnit } from '../functional-units/entities/functional-unit.entity';
import { Expense } from '../expenses/entities/expense.entity';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FunctionalUnitExpense,
      FunctionalUnit,
      Expense,
      User,
    ]),
  ],
  controllers: [FunctionalUnitsExpensesController],
  providers: [
    FunctionalUnitsExpensesService,
    FunctionalUnitsExpensesRepository,
    UsersRepository,
  ],
})
export class FunctionalUnitsExpensesModule {}
