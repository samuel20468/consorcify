import { PartialType } from '@nestjs/swagger';
import { CreateExpenditureDto } from './create-expenditure.dto';

export class UpdateExpenditureDto extends PartialType(CreateExpenditureDto) {}
