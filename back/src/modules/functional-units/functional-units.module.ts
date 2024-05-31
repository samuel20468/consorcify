import { Module } from '@nestjs/common';
import { FunctionalUnitsService } from './functional-units.service';
import { FunctionalUnitsController } from './functional-units.controller';
import { FunctionalUnitsRepository } from './functional-units.repository';

@Module({
  controllers: [FunctionalUnitsController],
  providers: [FunctionalUnitsService, FunctionalUnitsRepository],
})
export class FunctionalUnitsModule {}
