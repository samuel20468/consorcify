import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  /**
   * Nombre del usuario
   * @example "Juan"
   */
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(80, { message: 'El nombre no puede tener más de 80 caracteres' })
  @Matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+([\s']?[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/, {
    message: 'El nombre solo debe contener letras, espacios y apóstrofes',
  })
  first_name: string;

  /**
   * El apellido del Usuario
   * @example "Molina"
   */
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  @MaxLength(80, { message: 'El apellido no puede tener más de 80 caracteres' })
  @Matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+([\s']?[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/, {
    message: 'El apellido solo debe contener letras, espacios y apóstrofes',
  })
  last_name: string;

  /**
   * El correo electrónico del Usuario
   * @example "juan.molina@example.com"
   */
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @MaxLength(320, {
    message: 'El correo electrónico no puede tener más de 320 caracteres',
  })
  email: string;

  /**
   * La contraseña del Usuario
   * @example "Password123"
   */
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15, {
    message: 'La contraseña no puede tener más de 15 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/, {
    message: `El password debe contener al menos: 
        1 letra mayúscula.
        1 letra minúscula
        1 dígito numérico`,
  })
  password: string;
}
