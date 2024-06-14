import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { FunctionalUnitExpense } from '../functional-units-expenses/entities/functional-units-expense.entity';
import { Payment } from './entities/payment.entity';
import { API_URL, PAYMENT_STATUS } from 'src/utils/constants';
import { PaymentsRepository } from './payments.repository';
import checkEntityExistence from 'src/helpers/check-entity-existence.helper';
import { TPagination } from 'src/utils/types';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { FunctionalUnit } from '../functional-units/entities/functional-unit.entity';

@Injectable()
export class PaymentsService {
  private stripe;
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly usersRepository: UsersRepository,
    @InjectRepository(FunctionalUnitExpense)
    private readonly functionalUnitExpenseRepository: Repository<FunctionalUnitExpense>,
    @InjectRepository(FunctionalUnit)
    private readonly functionalUnitRepository: Repository<FunctionalUnit>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    });
  }

  async checkOut(functionalUnitExpenseId: string, paymentAmount: number) {
    const functionalUnitExpense =
      await this.functionalUnitExpenseRepository.findOne({
        where: { id: functionalUnitExpenseId },
        relations: ['functional_unit', 'functional_unit.user'],
      });

    if (!functionalUnitExpense)
      throw new ConflictException(
        'Se necesita una expensa de unidad funcional para efectuar el pago',
      );

    if (paymentAmount < 0) {
      throw new BadRequestException('El monto no puede ser negativo');
    }
    let amount: number;
    if (!paymentAmount) {
      amount = functionalUnitExpense.total_amount * 100;
    } else {
      amount = paymentAmount * 100;
    }
    const userEmail: string = functionalUnitExpense.functional_unit.user.email;

    const session = await this.stripe.checkout.sessions.create({
      client_reference_id: functionalUnitExpenseId,
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            unit_amount: amount,
            currency: 'ars',
            product: 'prod_QFpdVOk72ghQfC',
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${API_URL}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${API_URL}/payments/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    return session.url;
  }

  async verifyPayment(sessionId: string): Promise<Stripe.Checkout.Session> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    return session;
  }

  async savePayment(session: Stripe.Checkout.Session) {
    const payment = new Payment();
    payment.amount = session.amount_total / 100; // Convertir de centavos a la moneda original
    payment.payment_date = new Date();
    payment.payment_method = session.payment_method_types[0];
    payment.payment_status = PAYMENT_STATUS.PAID;
    payment.customer_email = session.customer_email;

    const functionalUnitExpense =
      await this.functionalUnitExpenseRepository.findOne({
        where: {
          id: session.client_reference_id,
        },
        relations: ['functional_unit'],
      });

    payment.functional_unit_expense = functionalUnitExpense;

    const savedPayment = await this.paymentsRepository.createPayment(payment);

    const functional_units_expenses: FunctionalUnitExpense[] =
      await this.functionalUnitExpenseRepository.find({
        where: {
          functional_unit: {
            id: functionalUnitExpense.functional_unit.id,
          },
        },
      });

    if (payment.amount >= functionalUnitExpense.functional_unit.balance) {
      for (const fue of functional_units_expenses) {
        if (fue.payment_status === PAYMENT_STATUS.PAID) continue;
        fue.payment_status = PAYMENT_STATUS.PAID;
        await this.functionalUnitExpenseRepository.save(fue);
      }
    } else {
      for (const fue of functional_units_expenses) {
        if (fue.payment_status === PAYMENT_STATUS.PAID) continue;
        fue.payment_status = PAYMENT_STATUS.PARTIAL;
        await this.functionalUnitExpenseRepository.save(fue);
      }
    }
    const functional_unit = functionalUnitExpense.functional_unit;
    functional_unit.balance = functional_unit.balance - payment.amount;
    await this.functionalUnitRepository.save(functional_unit);

    return savedPayment;
  }

  async findAll({ page, limit }: TPagination): Promise<Payment[]> {
    const payments: Payment[] = await this.paymentsRepository.findAll();

    if (payments.length == 0) throw new NotFoundException('No payments found');

    page = Math.max(1, page);

    limit = Math.max(1, limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return payments.slice(startIndex, endIndex);
  }

  async findAllByUser(
    { page, limit }: TPagination,
    userId: string,
  ): Promise<Payment[]> {
    if (!userId) {
      throw new BadRequestException('id is required');
    }

    const user: User = await checkEntityExistence(
      this.usersRepository,
      userId,
      'el usuario',
    );

    const payments: Payment[] =
      await this.paymentsRepository.findAllByUser(user);

    if (payments.length == 0) throw new NotFoundException('No payments found');

    page = Math.max(1, page);

    limit = Math.max(1, limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return payments.slice(startIndex, endIndex);
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const payment: Payment = await checkEntityExistence(
      this.paymentsRepository,
      id,
      'el pago',
    );

    return payment;
  }

  async toggleStatus(id: string) {
    let status: boolean;

    if (!id) {
      throw new BadRequestException('id is required');
    }

    const foundPayment: Payment = await this.paymentsRepository.findOne(id);

    if (!foundPayment) {
      throw new NotFoundException('Pago no encontrado');
    }

    status = foundPayment.active;

    await this.paymentsRepository.toggleStatus(id, status);

    foundPayment.functional_unit_expense.functional_unit.balance =
      foundPayment.functional_unit_expense.functional_unit.balance +
      foundPayment.amount;

    await this.functionalUnitRepository.save(
      foundPayment.functional_unit_expense.functional_unit,
    );

    return foundPayment;
  }
}
