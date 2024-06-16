import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {
  MAIL_FROM,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_USER,
} from 'src/utils/constants';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: MAIL_HOST,
        secure: false,
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `No Reply <${MAIL_FROM}>`,
      },
      template: {
        dir: join(__dirname, '../../../templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
