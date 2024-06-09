import { Module } from '@nestjs/common';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { Consortium } from '../consortiums/entities/consortium.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Consortium])],
  controllers: [PicturesController],
  providers: [PicturesService, CloudinaryConfig],
})
export class PicturesModule {}
