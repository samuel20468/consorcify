import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CAdmin, User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
