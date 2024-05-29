import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/, {
    message: `El password debe contener al menos: 
      1 letra mayúscula.
      1 letra minúscula
      1 dígito numérico
      1 carácter especial entre: "!@#$%^&*"`,
  })
  password: string;
}
