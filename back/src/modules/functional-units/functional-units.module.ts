import { Module } from '@nestjs/common';
import { FunctionalUnitsService } from './functional-units.service';
import { FunctionalUnitsController } from './functional-units.controller';
import { FunctionalUnitsRepository } from './functional-units.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionalUnit } from './entities/functional-unit.entity';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FunctionalUnit, Consortium, User])],
  controllers: [FunctionalUnitsController],
  providers: [FunctionalUnitsService, FunctionalUnitsRepository],
  exports: [FunctionalUnitsRepository],
})
export class FunctionalUnitsModule {}
