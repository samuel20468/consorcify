import { OmitType} from '@nestjs/swagger';
import { CreateExpenditureDto } from './create-expenditure.dto';

export class UpdateExpenditureDto extends OmitType(CreateExpenditureDto, [
  'supplier_id',
  'consortium_id',
]) {}
