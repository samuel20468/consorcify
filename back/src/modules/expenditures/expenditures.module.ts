import { Module } from '@nestjs/common';
import { ExpendituresService } from './expenditures.service';
import { ExpendituresController } from './expenditures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenditure } from './entities/expenditure.entity';
import { ExpendituresRepository } from './expenditures.repository';
import { SupplierConsortium } from '../suppliers/entities/suppliers-consortiums.entity';
import { ExpensesRepository } from '../expenses/expenses.repository';
import { Expense } from '../expenses/entities/expense.entity';
import { ConsortiumsRepository } from '../consortiums/consortiums.repository';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { CAdmin } from '../c-admin/entities/c-admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Expenditure,
      SupplierConsortium,
      Expense,
      Consortium,
      CAdmin,
    ]),
  ],
  controllers: [ExpendituresController],
  providers: [
    ExpendituresService,
    ExpendituresRepository,
    ExpensesRepository,
    ConsortiumsRepository,
  ],
})
export class ExpendituresModule {}
