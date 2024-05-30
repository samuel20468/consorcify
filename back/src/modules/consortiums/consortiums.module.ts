import { Module } from '@nestjs/common';
import { ConsortiumsService } from './consortiums.service';
import { ConsortiumsController } from './consortiums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consortium } from './entities/consortium.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Consortium])],
  controllers: [ConsortiumsController],
  providers: [ConsortiumsService],
})
export class ConsortiumsModule {}
