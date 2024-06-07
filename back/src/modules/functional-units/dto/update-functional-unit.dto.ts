import { PartialType } from '@nestjs/swagger';
import { CreateFunctionalUnitDto } from './create-functional-unit.dto';

export class UpdateFunctionalUnitDto extends PartialType(CreateFunctionalUnitDto) {}
