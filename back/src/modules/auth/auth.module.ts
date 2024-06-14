import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CAdminsRepository } from '../c-admin/c-admin.repository';
import { UsersRepository } from '../users/users.repository';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { MailsModule } from '../mails/mails.module';
import { MailsService } from '../mails/mails.service';
import { PassResetTokens } from './entities/reset-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CAdmin, User, PassResetTokens]),
    MailsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CAdminsRepository,
    UsersRepository,
    GoogleStrategy,
    MailsService,
  ],
})
export class AuthModule {}
