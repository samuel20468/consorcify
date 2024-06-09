import { PartialType } from '@nestjs/swagger';
import { CreateConsortiumDto } from './create-consortium.dto';

export class UpdateConsortiumDto extends PartialType(CreateConsortiumDto) {}
