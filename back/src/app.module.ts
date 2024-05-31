import { Module } from '@nestjs/common';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { CAdminModule } from './modules/c-admin/c-admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FunctionalUnitsModule } from './modules/functional-units/functional-units.module';
import { JwtModule } from '@nestjs/jwt';
import { ConsortiumsModule } from './modules/consortiums/consortiums.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    AuthModule,
    SuppliersModule,
    CAdminModule,
    UsersModule,
    FunctionalUnitsModule,
    ConsortiumsModule,
  ],
})
export class AppModule {}
