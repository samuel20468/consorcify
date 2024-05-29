import { IsBoolean, IsDecimal, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length, Matches, MaxLength } from "class-validator";

export class CreateProviderDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(1, 50, { message: 'Name must be between 1 and 50 characters' })
  name: string;

  @IsNotEmpty({ message: 'CUIT is required' })
  @IsString({ message: 'CUIT must be a string' })
  @Length(13, 13, { message: 'CUIT must be exactly 13 characters' })
  @Matches(/^[0-9]{2}-[0-9]{8}-[0-9]$/, { message: 'CUIT format is invalid' })
  cuit: string;

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
  phoneNumber: number;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsNotEmpty({ message: 'Balance is required' })
  @IsDecimal(
    { decimal_digits: '2', force_decimal: true },
    { message: 'Balance must be a decimal number with up to 2 decimal places' },
  )
  balance: number;

  @IsNotEmpty({ message: 'Active status is required' })
  @IsBoolean({ message: 'Active must be a boolean value' })
  active: boolean;
}
