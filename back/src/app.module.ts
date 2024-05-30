import { Module } from '@nestjs/common';
import { ConsortiumsModule } from './modules/consortiums/consortiums.module';


@Module({
  imports: [ConsortiumsModule],
})
export class AppModule {}
