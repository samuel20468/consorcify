import { PartialType } from '@nestjs/mapped-types';
import { CreateFunctionalUnitDto } from './create-functional-unit.dto';

export class UpdateFunctionalUnitDto extends PartialType(CreateFunctionalUnitDto) {}
