import { PartialType } from '@nestjs/swagger';
import { CreateFunctionalUnitsExpenseDto } from './create-functional-units-expense.dto';

export class UpdateFunctionalUnitsExpenseDto extends PartialType(CreateFunctionalUnitsExpenseDto) {}
