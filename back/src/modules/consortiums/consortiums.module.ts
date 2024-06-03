import { Module } from '@nestjs/common';
import { ConsortiumsService } from './consortiums.service';
import { ConsortiumsController } from './consortiums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consortium } from './entities/consortium.entity';
import { ConsortiumsRepository } from './consortiums.repository';
import { CAdmin } from '../c-admin/entities/c-admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consortium, CAdmin])],
  controllers: [ConsortiumsController],
  providers: [ConsortiumsService, ConsortiumsRepository],
})
export class ConsortiumsModule {}
