import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { CAdmin } from 'src/modules/c-admin/entities/c-admin.entity';

export class CreateConsortiumDto {
  /**
   * La clave SUTERH del Consorcio
   * @example "12345/01"
   */
  @IsOptional({ message: 'La clave SUTERH es opcional' })
  @IsString({ message: 'La clave SUTERH debe ser una cadena de texto' })
  @MaxLength(20, {
    message: 'La clave SUTERH debe tener como máximo 20 caracteres',
  })
  suterh_key: string;

  /**
   * La Razón Social del Consorcio
   * @example "Consorcio Edificio Rivadavia 456"
   */
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El nombre debe tener como máximo 50 caracteres' })
  name: string;

  /**
   * El CUIT del Consorcio
   * @example "30030345670"
   */
  @IsNotEmpty({ message: 'El CUIT es requerido' })
  @IsString({ message: 'El CUIT debe ser una cadena de texto' })
  @Length(11, 11, { message: 'El CUIT debe tener exactamente 11 caracteres' })
  cuit: string;

  /**
   * La calle del domicilio del Consorcio
   * @example "Av. Rivadavia"
   */
  @IsNotEmpty({ message: 'El nombre de la calle es requerido' })
  @IsString({ message: 'El nombre de la calle debe ser una cadena de texto' })
  @MaxLength(30, {
    message: 'El nombre de la calle debe tener como máximo 30 caracteres',
  })
  street_name: string;

  /**
   * El número del domicilio del Consorcio
   * @example 456
   */
  @IsNotEmpty({ message: 'El número del edificio es requerido' })
  building_number: number;

  /**
   * El código postal del Consorcio
   * @example "C1002AAP"
   */
  @IsNotEmpty({ message: 'El código postal es requerido' })
  @IsString({ message: 'El código postal debe ser una cadena de texto' })
  @MaxLength(10, {
    message: 'El código postal debe tener como máximo 10 caracteres',
  })
  zip_code: string;

  /**
   * El país del Consorcio
   * @example "Argentina"
   */
  @IsNotEmpty({ message: 'El país es requerido' })
  @IsString({ message: 'El país debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El país debe tener como máximo 50 caracteres' })
  country: string;

  /**
   * La provincia del Consorcio
   * @example "CABA"
   */
  @IsNotEmpty({ message: 'La provincia es requerida' })
  @IsString({ message: 'La provincia debe ser una cadena de texto' })
  @MaxLength(50, {
    message: 'La provincia debe tener como máximo 50 caracteres',
  })
  province: string;

  /**
   * La localidad del Consorcio
   * @example "CABA"
   */
  @IsNotEmpty({ message: 'La ciudad es requerida' })
  @IsString({ message: 'La ciudad debe ser una cadena de texto' })
  @MaxLength(50, { message: 'La ciudad debe tener como máximo 50 caracteres' })
  city: string;

  /**
   * La cantidad de pisos del Consorcio
   * @example 5
   */
  @IsNotEmpty({ message: 'La cantidad de pisos es requerida' })
  @IsInt({
    message: 'La cantidad de pisos debe ser un número entero sin decimales',
  })
  floors: number;

  /**
   * La cantidad de unidades funcionales del Consorcio
   * @example 17
   */
  @IsNotEmpty({ message: 'La cantidad de UFs es requerida' })
  @IsInt({
    message: 'La cantidad de UFs debe ser un número entero sin decimales',
  })
  ufs: number;

  /**
   * La categoría del Consorcio
   * @example 1
   */
  @IsNotEmpty({ message: 'La categoría es requerida' })
  @IsInt({ message: 'La categoría debe ser un número entero sin decimales' })
  @Min(1, { message: 'La categoría debe ser al menos 1' })
  @Max(4, { message: 'La categoría debe ser como máximo 4' })
  category: number;

  /**
   * El día del 1er vencimiento de expensas del Consorcio
   * @example 10
   */
  @IsNotEmpty({ message: 'El primer día de vencimiento es requerido' })
  @IsInt({
    message:
      'El primer día de vencimiento debe ser un número entero sin decimales',
  })
  @Min(1, { message: 'El primer día de vencimiento debe ser al menos 1' })
  @Max(31, { message: 'El primer día de vencimiento debe ser como máximo 31' })
  first_due_day: number;

  /**
   * El administrador del Consorcio
   * @example "5e4d5f8b-2e6d-4f49-9b3e-8d6c6f7e8a5b"
   */
  @IsNotEmpty({ message: 'El administrador de consorcio es requerido' })
  @IsUUID()
  @IsString({
    message:
      'El id del administrador de consorcio debe ser un valor alfanumérico',
  })
  c_admin: CAdmin;
}
