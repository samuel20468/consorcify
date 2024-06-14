import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { ExpensesRepository } from './expenses.repository';
import { ConsortiumsService } from '../consortiums/consortiums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { ConsortiumsRepository } from '../consortiums/consortiums.repository';
import { FunctionalUnitsExpensesRepository } from '../functional-units-expenses/functional-units-expenses.repository';
import { FunctionalUnitExpense } from '../functional-units-expenses/entities/functional-units-expense.entity';
import { FunctionalUnit } from '../functional-units/entities/functional-unit.entity';
import { MailsModule } from '../mails/mails.module';
import { MailsService } from '../mails/mails.service';
import { GoogleMapsService } from '../google-maps/google-maps.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Expense,
      Consortium,
      CAdmin,
      FunctionalUnitExpense,
      FunctionalUnit,
    ]),
    MailsModule,
  ],
  controllers: [ExpensesController],
  providers: [
    ExpensesService,
    ExpensesRepository,
    ConsortiumsService,
    ConsortiumsRepository,
    FunctionalUnitsExpensesRepository,
    MailsService,
    GoogleMapsService
  ],
})
export class ExpensesModule {}
