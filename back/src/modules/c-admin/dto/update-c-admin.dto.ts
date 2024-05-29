import { PartialType } from '@nestjs/mapped-types';
import { CreateCAdminDto } from './create-c-admin.dto';

export class UpdateCAdminDto extends PartialType(CreateCAdminDto) {}
