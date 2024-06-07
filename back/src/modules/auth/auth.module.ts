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
import { requiresAuth } from 'express-openid-connect';
import { CAdminsRepository } from '../c-admin/c-admin.repository';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CAdmin, User])],
  controllers: [AuthController],
  providers: [AuthService, CAdminsRepository, UsersRepository],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(requiresAuth())
      .forRoutes(
        { path: 'auth/signup/auth0', method: RequestMethod.GET },
        { path: 'auth/signin/auth0', method: RequestMethod.GET },
        { path: 'auth/auth0', method: RequestMethod.GET },
      );
  }
}
