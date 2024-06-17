import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailsService } from '../mails/mails.service';
import { ExpensesRepository } from '../expenses/expenses.repository';
import { UsersRepository } from '../users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../expenses/entities/expense.entity';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { FunctionalUnit } from '../functional-units/entities/functional-unit.entity';
import { FunctionalUnitExpense } from '../functional-units-expenses/entities/functional-units-expense.entity';
import { FunctionalUnitsExpensesRepository } from '../functional-units-expenses/functional-units-expenses.repository';
import { User } from '../users/entities/user.entity';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      Expense,
      User,
      Consortium,
      FunctionalUnit,
      FunctionalUnitExpense,
    ]),
  ],
  providers: [
    Reflector,
    RemindersService,
    MailsService,
    ExpensesRepository,
    UsersRepository,
    FunctionalUnitsExpensesRepository,
  ],
})
export class RemindersModule {}
