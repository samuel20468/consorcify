import { Module } from '@nestjs/common';
import { CAdminsService } from './c-admin.service';
import { CAdminsController } from './c-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CAdmin } from './entities/c-admin.entity';
import { CAdminsRepository } from './c-admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CAdmin])],
  controllers: [CAdminsController],
  providers: [CAdminsService, CAdminsRepository],
  exports: [CAdminsRepository],
})
export class CAdminModule {}
