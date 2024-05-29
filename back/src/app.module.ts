import { Module } from '@nestjs/common';
import { ProvidersModule } from './modules/providers/providers.module';
import { CAdminModule } from './modules/c-admin/c-admin.module';

@Module({
  imports: [ProvidersModule, CAdminModule],
})
export class AppModule {}
