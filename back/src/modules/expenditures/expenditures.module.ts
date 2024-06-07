import { Module } from '@nestjs/common';
import { ExpendituresService } from './expenditures.service';
import { ExpendituresController } from './expenditures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenditure } from './entities/expenditure.entity';
import { ExpendituresRepository } from './expenditures.repository';
import { Supplier } from '../suppliers/entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expenditure, Supplier])],
  controllers: [ExpendituresController],
  providers: [ExpendituresService, ExpendituresRepository],
})
export class ExpendituresModule {}
