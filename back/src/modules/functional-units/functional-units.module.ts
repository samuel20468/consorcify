import { Module } from '@nestjs/common';
import { FunctionalUnitsService } from './functional-units.service';
import { FunctionalUnitsController } from './functional-units.controller';

@Module({
  controllers: [FunctionalUnitsController],
  providers: [FunctionalUnitsService],
})
export class FunctionalUnitsModule {}
