import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Length,
} from 'class-validator';
import { EXPENDITURE_CATEGORY} from 'src/utils/constants';

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
  @IsDateString()
  date: Date;

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

  /**
   * El id del proveedor
   * @example "5e4d5f8b-2e6d-4f49-9b3e-8d6c6f7e8a5b"
   */
  @IsUUID(4, { message: 'El id del proveedor debe ser UUID v4' })
  @IsNotEmpty({ message: 'El proveedor es requerido' })
  supplier_id: string;

  /**
   * El id del consorcio
   * @example "5e4d5f8b-2e6d-4f49-9b3e-8d6c6f7e8a5b"
   */
  @IsUUID(4, { message: 'El id del consorcio debe ser UUID v4' })
  @IsNotEmpty({ message: 'El consorcio es requerido' })
  consortium_id: string;

  /**
   * El id de la expensa
   * @example "5e4d5f8b-2e6d-4f49-9b3e-8d6c6f7e8a5b"
   */
  @IsUUID(4, { message: 'El id de la expensa debe ser UUID v4' })
  @IsNotEmpty({ message: 'La expensa es requerido' })
  expense_id: string;
}
