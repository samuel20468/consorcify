import { Module } from '@nestjs/common';
import { CAdminsService } from './c-admin.service';
import { CAdminsController } from './c-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CAdmin } from './entities/c-admin.entity';
import { CAdminsRepository } from './c-admin.repository';
import { AuthService } from '../auth/auth.service';
import { ConsortiumsRepository } from '../consortiums/consortiums.repository';
import { User } from '../users/entities/user.entity';
import { PassResetTokens } from '../auth/entities/reset-token.entity';
import { JwtService } from '@nestjs/jwt';
import { MailsService } from '../mails/mails.service';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { GoogleMapsService } from '../google-maps/google-maps.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CAdmin, User, PassResetTokens, Consortium]),
  ],
  controllers: [CAdminsController],
  providers: [
    CAdminsService,
    CAdminsRepository,
    AuthService,
    ConsortiumsRepository,
    JwtService,
    MailsService,
    GoogleMapsService,
  ],
  exports: [CAdminsRepository],
})
export class CAdminModule {}
