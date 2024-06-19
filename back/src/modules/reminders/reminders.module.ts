import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailsService } from '../mails/mails.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../expenses/entities/expense.entity';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { FunctionalUnit } from '../functional-units/entities/functional-unit.entity';
import { FunctionalUnitExpense } from '../functional-units-expenses/entities/functional-units-expense.entity';
import { User } from '../users/entities/user.entity';
import { Reflector } from '@nestjs/core';
import { GoogleMapsService } from '../google-maps/google-maps.service';

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
  providers: [Reflector, RemindersService, MailsService, GoogleMapsService],
})
export class RemindersModule {}
