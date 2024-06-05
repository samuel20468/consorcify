import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Length,
} from 'class-validator';
import { EXPENDITURE_CATEGORY, EXPENDITURE_STATUS } from 'src/utils/constants';

export class CreateExpenditureDto {
  /**
   * El monto del Gasto
   * @example "1500.50"
   */
  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'El monto debe ser un número, puede contener hasta 2 decimales',
    },
  )
  total_amount: number;

  /**
   * La descripción del Gasto
   * @example "Gasto de luz"
   * */
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @Length(1, 150, {
    message: 'La descripción debe tener entre 1 y 150 caracteres',
  })
  description: string;

  /**
   * La fecha del Gasto
   * @example "2022-01-01"
   */
  @IsNotEmpty({ message: 'La fecha es requerida' })
  @IsDate({ message: 'La fecha debe ser una fecha' })
  date: Date;

  /**
   * El estado del Gasto
   * @enum {EXPENDITURE_STATUS}
   * @example "impago"
   * @example "pagado"
   * */
  @IsEnum(EXPENDITURE_STATUS, {
    message: 'El estado solo puede ser pagado o impago',
  })
  @IsNotEmpty({ message: 'El estado es requerido' })
  status: EXPENDITURE_STATUS;

  @ApiProperty({
    enum: Object.values(EXPENDITURE_CATEGORY),
    enumName: 'EXPENDITURE_CATEGORY',
    description: 'Categoría del gasto',
    example: EXPENDITURE_CATEGORY.UTILITIES,
  })
  @ApiProperty({
    enum: [
      {
        value: EXPENDITURE_CATEGORY.UTILITIES,
        description: 'Servicios Públicos',
      },
      {
        value: EXPENDITURE_CATEGORY.SERVICE_SUBSCRIPTION,
        description: 'Abono de Servicios',
      },
      {
        value: EXPENDITURE_CATEGORY.COMMON_AREA_MAINTENANCE,
        description: 'Mantenimiento de partes comunes',
      },
      {
        value: EXPENDITURE_CATEGORY.BANK_FEES,
        description: 'Gastos bancarios',
      },
      {
        value: EXPENDITURE_CATEGORY.CLEANING_EXPENSES,
        description: 'Gastos de limpieza',
      },
      {
        value: EXPENDITURE_CATEGORY.ADMINISTRATIVE_EXPENSES,
        description: 'Gastos administrativos',
      },
      { value: EXPENDITURE_CATEGORY.INSURANCES, description: 'Seguro' },
      { value: EXPENDITURE_CATEGORY.SALARIES, description: 'Sueldos' },
      { value: EXPENDITURE_CATEGORY.OTHER_EXPENSES, description: 'Otros' },
    ],
  })
  @IsNotEmpty({ message: 'La categoría es requerida' })
  @IsEnum(EXPENDITURE_CATEGORY, {
    message: 'La categoría solo puede ser una de las opciones listadas',
  })
  category: EXPENDITURE_CATEGORY;

  /**
   * El número de la factura (cuatro dígitos para el punto de venta y 8 dígitos para el número de la factura de ese punto de venta)
   * @example "000112345678"
   */
  @IsNotEmpty({ message: 'El número de la factura es requerido' })
  @Length(12, 12, {
    message: 'El número de la factura debe tener 12 dígitos',
  })
  invoice_number: string;
}
