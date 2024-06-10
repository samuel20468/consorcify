import { Injectable, NotFoundException } from '@nestjs/common';
import { v2, UploadApiResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Consortium } from '../consortiums/entities/consortium.entity';
import { CAdmin } from '../c-admin/entities/c-admin.entity';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Consortium)
    private readonly consortiumsRepository: Repository<Consortium>,
    @InjectRepository(CAdmin)
    private readonly cAdminsRepository: Repository<CAdmin>,
  ) {}
  async uploadPicture(
    id: string,
    image: Express.Multer.File,
    entity: string,
  ): Promise<UploadApiResponse> {
    if (entity === 'users') {
      const foundUser = await this.usersRepository.findOneBy({ id });
      if (!foundUser) {
        throw new NotFoundException(`Usuario con ID ${id}, no encontrado.`);
      }
    }
    if (entity === 'consortiums') {
      const foundConsortium = await this.consortiumsRepository.findOneBy({
        id,
      });
      if (!foundConsortium) {
        throw new NotFoundException(`Consorcio con ID ${id}, no encontrado.`);
      }
    }
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
            if (entity === 'users') {
              this.usersRepository.update(id, { picture: result.secure_url });
            } else if (entity === 'consortiums') {
              this.consortiumsRepository.update(id, {
                picture: result.secure_url,
              });
            } else if (entity === 'c-admins') {
              this.cAdminsRepository.update(id, { picture: result.secure_url });
            }
          }
        },
      );
      toStream(image.buffer).pipe(upload);
    });
  }
}
