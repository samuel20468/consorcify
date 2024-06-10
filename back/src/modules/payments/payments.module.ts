import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { FunctionalUnitExpense } from '../functional-units-expenses/entities/functional-units-expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, FunctionalUnitExpense])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
