import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { FunctionalUnitExpense } from '../functional-units-expenses/entities/functional-units-expense.entity';
import { Payment } from './entities/payment.entity';
import { API_URL, PAYMENT_STATUS } from 'src/utils/constants';

@Injectable()
export class PaymentsService {
  private stripe;
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(FunctionalUnitExpense)
    private functionalUnitExpenseRepository: Repository<FunctionalUnitExpense>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    });
  }

  async checkOut(functionalUnitExpenseId: string) {
    const functionalUnitExpense =
      await this.functionalUnitExpenseRepository.findOne({
        where: { id: functionalUnitExpenseId },
        relations: ['functional_unit', 'functional_unit.user'],
      });

    if (!functionalUnitExpense)
      throw new ConflictException(
        'Se necesita una expensa de unidad funcional para efectuar el pago',
      );

    const amount: number = functionalUnitExpense.total_amount * 100;
    const userEmail: string = functionalUnitExpense.functional_unit.user.email;

    const session = await this.stripe.checkout.sessions.create({
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
    const paymentStatusMapping = {
      paid: PAYMENT_STATUS.PAID,
      unpaid: PAYMENT_STATUS.UNPAID,
    };

    const paymentStatus =
      paymentStatusMapping[session.payment_status] || PAYMENT_STATUS.PENDING;

    const payment = new Payment();
    payment.amount = session.amount_total / 100; // Convertir de centavos a la moneda original
    payment.payment_date = new Date();
    payment.payment_method = session.payment_method_types[0];
    payment.payment_status = paymentStatus;
    payment.customer_email = session.customer_email;

    const functionalUnitExpense =
      await this.functionalUnitExpenseRepository.findOne({
        where: {
          functional_unit: {
            user: {
              email: session.customer_email,
            },
          },
        },
        relations: ['functional_unit'],
      });

    payment.functional_unit_expense = functionalUnitExpense;

    return await this.paymentRepository.save(payment);
  }

  findAll() {
    return `This action returns all payments`;
  }

  async findOne(id: string) {
    return await this.paymentRepository.findOne({
      where: { id },
      relations: { functional_unit_expense: true },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
