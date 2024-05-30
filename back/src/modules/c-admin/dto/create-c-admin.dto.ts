import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateCAdminDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(3, 80, { message: 'Name must be between 3 and 80 characters' })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Name cannot contain numbers',
  })
  name: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @Length(6, 30, { message: 'Address must be between 6 and 30 characters' })
  address: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Email contains invalid characters',
  })
  @IsString({ message: 'Email must be a string' })
  @MaxLength(50, { message: 'Email must be at most 50 characters' })
  email: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsPhoneNumber(null, { message: 'Phone number must be a valid phone number' })
  phone_number: string;

  @IsNotEmpty({ message: 'CUIT is required' })
  @IsString({ message: 'CUIT must be a string' })
  @Length(11, 11, { message: 'CUIT must be exactly 11 characters' })
  cuit: string;

  @IsNotEmpty({ message: 'SAT is required' })
  @IsString({ message: 'SAT must be a string' })
  sat: string;

  @IsNotEmpty({ message: 'RPA is required' })
  @IsString({ message: 'RPA must be a string' })
  @Length(5, 5, { message: 'RPA must be exactly 5 characters' })
  rpa: string;
}
