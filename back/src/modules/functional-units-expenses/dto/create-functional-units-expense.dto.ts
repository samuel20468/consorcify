import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateFunctionalUnitsExpenseDto {
     /**
   * El monto del prorrateo de la expensa
   * @example 1000.50
   */
  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'El monto debe ser un número, puede contener hasta 2 decimales',
    },
  )
  monthly_expenditure: number;

  /**
   * El monto del estado de cuenta (balance) de la Unidad Funcional al momento de generar la Expensa
   * @example 1000.50
   */
  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'El monto debe ser un número, puede contener hasta 2 decimales',
    },
  )
  previous_balance: number;

  /**
   * El monto de los intereses de la Unidad Funcional por mora
   * @example 1000.50
   */
  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'El monto debe ser un número, puede contener hasta 2 decimales',
    },
  )
  interests: number;

  /**
   * El monto de la expensa mensual de la Unidad Funcional
   * @example 1000.50
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
   * El ID de la Expensa
   * @example "75b4566f-ddc3-4b7c-93de-4f4d5840cc34"
   */
  @IsUUID(4, { message: 'El id de la Expensa debe ser UUID v4' })
  @IsNotEmpty( { message: 'El ID de la Expensa es requerido' })
  expense_id: string;

  /**
   * El ID de la Unidad Funcional
   * @example "75b4566f-ddc3-4b7c-93de-4f4d5840cc34"
   */
  @IsUUID(4, { message: 'El id de la Unidad Funcional debe ser UUID v4' })
  @IsNotEmpty( { message: 'El ID de la Unidad Funcional es requerido' })
  functional_unit_id: string;
}
