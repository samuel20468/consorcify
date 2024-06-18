import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePassDto {
  /**
   * La nueva contraseña del Usuario
   * @example "NewPass123"
   */
  @IsNotEmpty()
  @IsString()
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
  old_password: string;
  /**
   * La nueva contraseña del Usuario
   * @example "NewPass123"
   */
  @IsNotEmpty()
  @IsString()
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
