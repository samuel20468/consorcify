import { Module } from '@nestjs/common';
import { ExpendituresService } from './expenditures.service';
import { ExpendituresController } from './expenditures.controller';

@Module({
  controllers: [ExpendituresController],
  providers: [ExpendituresService],
})
export class ExpendituresModule {}
