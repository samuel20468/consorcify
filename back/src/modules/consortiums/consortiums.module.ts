import { Module } from '@nestjs/common';
import { ConsortiumsService } from './consortiums.service';
import { ConsortiumsController } from './consortiums.controller';

@Module({
  controllers: [ConsortiumsController],
  providers: [ConsortiumsService],
})
export class ConsortiumsModule {}
