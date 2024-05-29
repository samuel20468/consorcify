import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { FunctionalUnitsModule } from './modules/functional-units/functional-units.module';


@Module({
  imports: [UsersModule, FunctionalUnitsModule],
})
export class AppModule {}
