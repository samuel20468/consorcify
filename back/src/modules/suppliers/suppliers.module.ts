import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { SuppliersRepository } from './suppliers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { ConsortiumsService } from '../consortiums/consortiums.service';
import { ConsortiumsRepository } from '../consortiums/consortiums.repository';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { CAdmin } from '../c-admin/entities/c-admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Supplier,
      Consortium,
      CAdmin,
    ]),
  ],
  controllers: [SuppliersController],
  providers: [
    SuppliersService,
    SuppliersRepository,
    ConsortiumsRepository,
    ConsortiumsService,
  ],
})
export class SuppliersModule {}
