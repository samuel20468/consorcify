import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';
import { SAT } from 'src/utils/constants';

export class CreateCAdminDto {
  /**
   * El nombre del administrador del consorcio
   * @example "Pedro Sanchez"
   */
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres' })
  @Matches(/^[a-zA-Z\s]+$/, { message: 'El nombre no puede contener números' })
  name: string;

  /**
   * La dirección del administrador del consorcio
   * @example "Av. Rivadavia 1234"
   */
  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @Length(6, 30, { message: 'La dirección debe tener entre 6 y 30 caracteres' })
  address: string;

  /**
   * El correo electrónico del administrador del consorcio
   * @example "pedro.sanchez@example.com"
   */
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  @IsEmail(
    {},
    {
      message: 'El correo electrónico debe ser una dirección de correo válida',
    },
  )
  @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
  @Length(1, 50, {
    message: 'El correo electrónico debe tener como máximo 50 caracteres',
  })
  email: string;

  /**
   * El número de teléfono del administrador del consorcio
   * @example "+5491145678901"
   */
  @IsNotEmpty({ message: 'El número de teléfono es requerido' })
  @IsPhoneNumber(null, {
    message: 'El número de teléfono debe ser un número de teléfono válido',
  })
  phone_number: string;

  /**
   * El CUIT del administrador del consorcio
   * @example "20300345670"
   */
  @IsNotEmpty({ message: 'El CUIT es requerido' })
  @IsString({ message: 'El CUIT debe ser una cadena de texto' })
  @Length(11, 11, { message: 'El CUIT debe tener exactamente 11 caracteres' })
  cuit: string;

  /**
   * El tipo de inscripción tributaria del administrador del consorcio (SAT)
   * @example "Monotributo"
   */
  @IsNotEmpty({ message: 'El SAT es requerido' })
  @IsString({ message: 'El SAT debe ser una cadena de texto' })
  @IsEnum(SAT, { message: 'El SAT debe ser un valor de enumeración válido' })
  sat: SAT;

  /**
   * El Registro de la Propiedad Automotor (RPA) del administrador del consorcio
   * @example "ABCDE"
   */
  @IsNotEmpty({ message: 'El RPA es requerido' })
  @IsString({ message: 'El RPA debe ser una cadena de texto' })
  @Length(5, 5, { message: 'El RPA debe tener exactamente 5 caracteres' })
  rpa: string;
}
