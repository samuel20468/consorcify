import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {
  MAIL_REDIRECT_URL,
  SUBJECT_MAIL,
  TEMPLATES_MAIL,
} from 'src/utils/constants';
import { TContextMail } from 'src/utils/types';

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}

  private async sendMail(
    to: string,
    subject: string,
    template: string,
    context: TContextMail,
  ) {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }

  async sendNewAccount(user: string, email: string) {
    const url = MAIL_REDIRECT_URL;
    const subject: SUBJECT_MAIL = SUBJECT_MAIL.NEW_ACCOUNT;
    const template: TEMPLATES_MAIL = TEMPLATES_MAIL.WELCOME_USER;
    const context = {
      user,
      url,
    };
    await this.sendMail(email, subject, template, context);
  }

  async sendNewCAdmin(user: string, email: string) {
    const url = MAIL_REDIRECT_URL;
    const subject: SUBJECT_MAIL = SUBJECT_MAIL.NEW_ACCOUNT;
    const template: TEMPLATES_MAIL = TEMPLATES_MAIL.WELCOME_CADMIN;
    const context = {
      user,
      url,
      email,
    };
    await this.sendMail(email, subject, template, context);
  }

  async sendResetPassword(user: string, email: string, token: string) {
    // const url = `${MAIL_REDIRECT_URL}/reset-password?token=${token}`;
    const url = `http://localhost:3000/resetPassword?token=${token}`;
    const subject: SUBJECT_MAIL = SUBJECT_MAIL.NEW_PASSWORD;
    const template: TEMPLATES_MAIL = TEMPLATES_MAIL.NEW_PASSWORD;
    const context = {
      user,
      url,
    };
    await this.sendMail(email, subject, template, context);
  }

  async sendSuccessfulPayment(user: string, email: string, amount: number) {
    const url = MAIL_REDIRECT_URL;
    const subject: SUBJECT_MAIL = SUBJECT_MAIL.SUCCESSFUL_PAYMENT;
    const template: TEMPLATES_MAIL = TEMPLATES_MAIL.SUCCESSFUL_PAYMENT;
    const context = {
      user,
      url,
      amount,
    };
    await this.sendMail(email, subject, template, context);
  }

  async sendNewExpense(
    user: string,
    email: string,
    amount: number,
    nameConsortium: string,
    nameExpense: string,
  ) {
    const url = MAIL_REDIRECT_URL;
    const subject: SUBJECT_MAIL = SUBJECT_MAIL.NEW_EXPENSE;
    const template: TEMPLATES_MAIL = TEMPLATES_MAIL.NEW_EXPENSE;
    const context = {
      user,
      url,
      amount,
      nameConsortium,
      nameExpense,
    };
    await this.sendMail(email, subject, template, context);
  }

  async sendIndividualExpense(
    user: string,
    email: string,
    amount: number,
    totalAmount: number,
    uF: string,
  ) {
    const url = MAIL_REDIRECT_URL;
    const subject: SUBJECT_MAIL = SUBJECT_MAIL.INDIVIDUAL_EXPENSE;
    const template: TEMPLATES_MAIL = TEMPLATES_MAIL.INDIVIDUAL_EXPENSE;
    const context = {
      user,
      url,
      amount,
      totalAmount,
      uF,
    };
    await this.sendMail(email, subject, template, context);
  }

  async sendPaymentReminder(
    user: string,
    email: string,
    totalAmount: number,
    expirationDate: Date,
  ) {
    const url = MAIL_REDIRECT_URL;
    const subject: SUBJECT_MAIL = SUBJECT_MAIL.PAYMENT_REMINDER;
    const template: TEMPLATES_MAIL = TEMPLATES_MAIL.PAYMENT_REMINDER;
    const context = {
      user,
      url,
      totalAmount,
      expirationDate,
    };
    await this.sendMail(email, subject, template, context);
  }
}
