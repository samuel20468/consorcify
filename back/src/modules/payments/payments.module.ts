import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { FunctionalUnitExpense } from '../functional-units-expenses/entities/functional-units-expense.entity';
import { PaymentsRepository } from './payments.repository';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/entities/user.entity';
import { FunctionalUnit } from '../functional-units/entities/functional-unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, FunctionalUnitExpense, User, FunctionalUnit])],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository, UsersRepository],
})
export class PaymentsModule {}
