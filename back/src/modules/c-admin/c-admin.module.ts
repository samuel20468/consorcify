import { Module } from '@nestjs/common';
import { CAdminService } from './c-admin.service';
import { CAdminController } from './c-admin.controller';

@Module({
  controllers: [CAdminController],
  providers: [CAdminService],
})
export class CAdminModule {}
