import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateExpenseDto {
  /**
   * La fecha de emisión del gasto
   * @example "2024-06-02"
   */
  @IsNotEmpty({ message: 'La fecha de emisión es obligatoria' })
  @Type(() => Date)
  @IsDate({ message: 'La fecha de emisión debe ser una fecha válida' })
  issue_date: Date;

  /**
   * La fecha de vencimiento del gasto
   * @example "2024-07-02"
   */
  @IsNotEmpty({ message: 'La fecha de vencimiento es obligatoria' })
  @Type(() => Date)
  @IsDate({ message: 'La fecha de vencimiento debe ser una fecha válida' })
  expiration_date: Date;

  /**
   * El ID del consorcio asociado (UUID V4)
   * @example "75b4566f-ddc3-4b7c-93de-4f4d5840cc34"
   */
  @IsNotEmpty({ message: 'El ID del consorcio es obligatorio' })
  @IsUUID('4', { message: 'El ID del consorcio debe ser un UUID válido' })
  consortium_id: string;
}
