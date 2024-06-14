import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  /**
   * El token enviado para reestablecer contraseña
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
   */
  @IsNotEmpty()
  @IsString()
  token: string;

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
  new_password: string;
}
