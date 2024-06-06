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

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Consortium, CAdmin])],
  controllers: [ExpensesController],
  providers: [
    ExpensesService,
    ExpensesRepository,
    ConsortiumsService,
    ConsortiumsRepository,
  ],
})
export class ExpensesModule {}
