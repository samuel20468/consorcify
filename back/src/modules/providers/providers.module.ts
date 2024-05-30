import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { ProvidersRepository } from './providers.repository';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService, ProvidersRepository],
})
export class ProvidersModule {}
