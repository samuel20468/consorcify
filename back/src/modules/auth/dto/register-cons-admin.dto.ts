import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class RegisterConsAdminDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El campo "name" no puede contener números',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  cuit: string;

  @IsNotEmpty()
  @IsString()
  sat: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 5)
  rpa: string;
}
