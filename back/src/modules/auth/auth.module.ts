import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { requiresAuth } from 'express-openid-connect';

@Module({
  imports: [TypeOrmModule.forFeature([CAdmin, User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(requiresAuth())
      .forRoutes(
        { path: 'auth/signup/auth0', method: RequestMethod.GET },
        { path: 'auth/signin/auth0', method: RequestMethod.GET },
      );
  }
}
