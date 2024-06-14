import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: string, email: string) {
    console.log('Templates directory:', join(__dirname, 'templates'));
    const url = 'https://consorcify.vercel.app';
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirmación de creación de cuenta',
      template: './welcome',
      context: {
        name: user,
        url,
      },
    });
  }
}
