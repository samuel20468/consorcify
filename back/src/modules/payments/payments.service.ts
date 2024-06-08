import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';

const APP_URL: string = process.env.BASE_URL;

@Injectable()
export class PaymentsService {
  private stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    });
  }

  async checkOut() {
    const amount: number = 200000; //Monto a pagar traido del balance de la unidad funcional
    const userEmail: string = 'samuel@mail.com'; //Email del usuario traido de la unidad funcional

    const session = await this.stripe.checkout.sessions.create({
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            unit_amount: amount,
            currency: 'ars',
            product: 'prod_QFpdVOk72ghQfC', //ID de producto previamente creado en el Dashboard de stripe
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${APP_URL}/success`,
      cancel_url: `${APP_URL}/cancel`,
    });

    return session;
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
