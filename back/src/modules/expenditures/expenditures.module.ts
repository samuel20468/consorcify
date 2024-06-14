import { Module } from '@nestjs/common';
import { ExpendituresService } from './expenditures.service';
import { ExpendituresController } from './expenditures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenditure } from './entities/expenditure.entity';
import { ExpendituresRepository } from './expenditures.repository';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { ExpensesRepository } from '../expenses/expenses.repository';
import { Expense } from '../expenses/entities/expense.entity';
import { ConsortiumsRepository } from '../consortiums/consortiums.repository';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { FunctionalUnitExpense } from '../functional-units-expenses/entities/functional-units-expense.entity';
import { FunctionalUnitsExpensesRepository } from '../functional-units-expenses/functional-units-expenses.repository';
import { FunctionalUnitsRepository } from '../functional-units/functional-units.repository';
import { FunctionalUnit } from '../functional-units/entities/functional-unit.entity';
import { User } from '../users/entities/user.entity';
<<<<<<< HEAD
import { MailsService } from '../mails/mails.service';
=======
import { GoogleMapsService } from '../google-maps/google-maps.service';
>>>>>>> develop

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Expenditure,
      Supplier,
      Expense,
      Consortium,
      CAdmin,
      FunctionalUnitExpense,
      FunctionalUnit,
      User,
    ]),
  ],
  controllers: [ExpendituresController],
  providers: [
    ExpendituresService,
    ExpendituresRepository,
    ExpensesRepository,
    ConsortiumsRepository,
    FunctionalUnitsExpensesRepository,
    FunctionalUnitsRepository,
<<<<<<< HEAD
    MailsService,
=======
    GoogleMapsService
>>>>>>> develop
  ],
})
export class ExpendituresModule {}
