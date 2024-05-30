import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El campo "name" no puede contener números',
  })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El campo "lastname" no puede contener números',
  })
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

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
