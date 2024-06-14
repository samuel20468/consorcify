import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  password: string;
}
