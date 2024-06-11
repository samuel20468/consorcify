import { OmitType} from '@nestjs/swagger';
import { CreateSupplierDto } from './create-supplier.dto';

export class UpdateSupplierDto extends OmitType(CreateSupplierDto, [
  'cuit',
  'consortium_id',
]) {}
