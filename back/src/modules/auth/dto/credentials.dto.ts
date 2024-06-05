import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CredentialsDto {
  /**
   * El correo electrónico del Usuario
   * @example "juan.molina@example.com"
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * La contraseña del Usuario
   * @example "Password123"
   */
  @IsNotEmpty()
  @IsString()
  @Length(6, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/, {
    message: `El password debe contener al menos: 
      1 letra mayúscula.
      1 letra minúscula
      1 dígito numérico`,
  })
  password: string;
}
