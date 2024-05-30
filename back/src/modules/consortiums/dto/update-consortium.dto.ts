import { PartialType } from '@nestjs/mapped-types';
import { CreateConsortiumDto } from './create-consortium.dto';

export class UpdateConsortiumDto extends PartialType(CreateConsortiumDto) {}
