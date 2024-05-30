import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateConsortiumDto {
  @IsOptional()
  @IsString({ message: 'SUTERH key must be a string' })
  @MaxLength(20, { message: 'SUTERH key must be at most 20 characters' })
  suterh_key: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MaxLength(50, { message: 'Name must be at most 50 characters' })
  name: string;

  @IsNotEmpty({ message: 'CUIT is required' })
  @IsString({ message: 'CUIT must be a string' })
  @Length(11, 11, { message: 'CUIT must be exactly 11 characters' })
  cuit: string;

  @IsNotEmpty({ message: 'Street name is required' })
  @IsString({ message: 'Street name must be a string' })
  @MaxLength(30, { message: 'Street name must be at most 30 characters' })
  street_name: string;

  @IsNotEmpty({ message: 'Building number is required' })
  building_number: number;

  @IsNotEmpty({ message: 'ZIP code is required' })
  @IsString({ message: 'ZIP code must be a string' })
  @MaxLength(10, { message: 'ZIP code must be at most 10 characters' })
  zip_code: string;

  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country must be a string' })
  @MaxLength(50, { message: 'Country must be at most 50 characters' })
  country: string;

  @IsNotEmpty({ message: 'Province is required' })
  @IsString({ message: 'Province must be a string' })
  @MaxLength(50, { message: 'Province must be at most 50 characters' })
  province: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a string' })
  @MaxLength(50, { message: 'City must be at most 50 characters' })
  city: string;

  @IsNotEmpty({ message: '(Number of) Floors is required' })
  @IsInt({ message: '(Number of) Floors must be an integer without decimals' })
  floors: number;

  @IsNotEmpty({ message: '(Number of) UFs is required' })
  @IsInt({ message: '(Number of) UFs must be an integer without decimals' })
  ufs: number;

  @IsNotEmpty({ message: 'Category is required' })
  @IsInt({ message: 'Category must be an integer without decimals' })
  @Min(1, { message: 'Category must be at least 1' })
  @Max(4, { message: 'Category must be at most 4' })
  category: number;

  @IsNotEmpty({ message: 'First due day is required' })
  @IsInt({ message: 'First due day must be an integer without decimals' })
  @Min(1, { message: 'First due day must be at least 1' })
  @Max(31, { message: 'First due day must be at most 31' })
  first_due_day: number;
}
