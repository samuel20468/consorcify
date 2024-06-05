import { Module } from '@nestjs/common';
import { ExpendituresService } from './expenditures.service';
import { ExpendituresController } from './expenditures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenditure } from './entities/expenditure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expenditure])],
  controllers: [ExpendituresController],
  providers: [ExpendituresService],
})
export class ExpendituresModule {}
