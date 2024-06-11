import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateExpenseDto {
  /**
   * Nombre descriptivo de la expensa
   * @example "Expensa de Junio"
   */
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El nombre debe tener como máximo 50 caracteres' })
  name: string;

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
