import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { IsNotEmpty, IsString, Length, Matches, IsPhoneNumber, IsDecimal } from 'class-validator';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
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
  @IsDecimal(
    { decimal_digits: '2', force_decimal: true },
    { message: 'El saldo debe ser un número decimal con hasta 2 decimales' },
  )
  balance: number;
}
