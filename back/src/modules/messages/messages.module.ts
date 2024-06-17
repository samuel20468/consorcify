import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Message } from './entities/message.entity';
import { FunctionalUnit } from '../functional-units/entities/functional-unit.entity';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { UsersRepository } from '../users/users.repository';
import { FunctionalUnitsRepository } from '../functional-units/functional-units.repository';
import { ConsortiumsRepository } from '../consortiums/consortiums.repository';
import { CAdminsRepository } from '../c-admin/c-admin.repository';
import { GoogleMapsService } from '../google-maps/google-maps.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message,
      User,
      FunctionalUnit,
      Consortium,
      CAdmin,
    ]),
  ],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    MessagesRepository,
    UsersRepository,
    FunctionalUnitsRepository,
    ConsortiumsRepository,
    CAdminsRepository,
    GoogleMapsService,
  ],
})
export class MessagesModule {}
