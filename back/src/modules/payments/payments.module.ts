import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { FunctionalUnitExpense } from '../functional-units-expenses/entities/functional-units-expense.entity';
import { PaymentsRepository } from './payments.repository';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/entities/user.entity';
import { MailsModule } from '../mails/mails.module';
import { MailsService } from '../mails/mails.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, FunctionalUnitExpense, User]),
    MailsModule,
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentsRepository,
    UsersRepository,
    MailsService,
  ],
})
export class PaymentsModule {}
