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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PicturesService } from './pictures.service';
import { UploadApiResponse } from 'cloudinary';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthCustomGuard } from 'src/guards/auth.guard';
@ApiTags('Pictures')
@Controller('pictures')
@ApiBearerAuth()
@UseGuards(AuthCustomGuard)
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
            maxSize: 1000000,
            message: 'El archivo debe pesar menos de 1 Mb',
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
  @Post('update-cadmin/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadCAdminPicture(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000,
            message: 'El archivo debe pesar menos de 1 Mb',
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

  @Post('update-consortium/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadConsortiumPicture(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000,
            message: 'El archivo debe pesar menos de 1 Mb',
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
}
