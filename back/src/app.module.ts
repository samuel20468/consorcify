import { Module } from '@nestjs/common';
import { ProvidersModule } from './modules/providers/providers.module';
import { CAdminModule } from './modules/c-admin/c-admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';

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
    AuthModule,
    ProvidersModule,
    CAdminModule,
  ],
})
export class AppModule {}
