import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PicturesService } from './pictures.service';
import { UploadApiResponse } from 'cloudinary';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post('update-user/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadUserPicture(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El archivo debe pesar menos de 200 Kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|svg)/,
          }),
        ],
      }),
    )
    image: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    return await this.picturesService.uploadPicture(id, image, 'users');
  }

  @Post('update-consortium/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadConsortiumPicture(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El archivo debe pesar menos de 200 Kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|svg)/,
          }),
        ],
      }),
    )
    image: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    return await this.picturesService.uploadPicture(id, image, 'consortiums');
  }

  @Post('update-cadmin/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadCAdminicture(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El archivo debe pesar menos de 200 Kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|svg)/,
          }),
        ],
      }),
    )
    image: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    return await this.picturesService.uploadPicture(id, image, 'c-admins');
  }
}
