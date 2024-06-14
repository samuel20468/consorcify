import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailDto {
  /**
   * El correo electrónico del Usuario
   * @example "juan.molina@example.com"
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
