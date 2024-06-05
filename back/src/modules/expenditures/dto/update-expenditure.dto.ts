import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenditureDto } from './create-expenditure.dto';

export class UpdateExpenditureDto extends PartialType(CreateExpenditureDto) {}
