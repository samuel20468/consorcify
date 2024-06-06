import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsEmail,
  IsPhoneNumber,
  MaxLength,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class CreateSupplierDto {
  /**
   * El nombre del Proveedor
   * @example "Limpiezas SRL"
   */
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
  @Matches(/^[a-zA-Z\s]+$/, { message: 'El nombre no puede contener números' })
  name: string;

  /**
   * El CUIT del Proveedor
   * @example "30567891234"
   */
  @IsNotEmpty({ message: 'El CUIT es requerido' })
  @IsString({ message: 'El CUIT debe ser una cadena de texto' })
  @Length(11, 11, { message: 'El CUIT debe tener exactamente 11 caracteres' })
  cuit: string;

  /**
   * El correo electrónico del Proveedor
   * @example "contacto@limpiezassrl.com"
   */
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  @IsEmail(
    {},
    {
      message: 'El correo electrónico debe ser una dirección de correo válida',
    },
  )
  @Matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'El correo electrónico contiene caracteres inválidos',
  })
  @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
  @MaxLength(50, {
    message: 'El correo electrónico debe tener como máximo 50 caracteres',
  })
  email: string;

  /**
   * El número de teléfono del Proveedor
   * @example "+5491145678901"
   */
  @IsNotEmpty({ message: 'El número de teléfono es requerido' })
  @IsPhoneNumber(null, {
    message: 'El número de teléfono debe ser un número válido',
  })
  phone_number: string;

  /**
   * La dirección del Proveedor
   * @example "Av. Siempre Viva 123"
   */
  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  address: string;

  /**
   * El saldo del Proveedor
   * @example "2000.00"
   */
  @IsNotEmpty({ message: 'El saldo es requerido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'El saldo debe ser un número con hasta 2 decimales',
    },
  )
  balance: number;

  /**
   * El saldo inicial entre el Proveedor y el Consorcio
   * @example "1000.50"
   */
  @IsNotEmpty({ message: 'El saldo inicial es requerido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'El saldo inicial debe ser un número con hasta 2 decimales',
    },
  )
  initial_balance: number;

  /**
   * El Consorcio a relacionar
   * @example "5e4d5f8b-2e6d-4f49-9b3e-8d6c6f7e8a5b"
   */
  @IsNotEmpty({ message: 'El administrador de consorcio es requerido' })
  @IsUUID()
  @IsString({
    message:
      'El id del administrador de consorcio debe ser un valor alfanumérico',
  })
  consortium_id: string;
}
