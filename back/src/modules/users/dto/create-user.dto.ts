import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  @Matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+([\s']?[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/, {
    message: 'First name must contain only letters, spaces, and apostrophes',
  })
  first_name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(80)
  @Matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+([\s']?[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/, {
    message: 'Last name must contain only letters, spaces, and apostrophes',
  })
  last_name: string;

  @IsEmail()
  @MaxLength(320)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
    {
      message:
        'The password must contain at least one lowercase letter, one uppercase letter, a number, and one of the following special characters: !@#$%^&*',
    },
  )
  password: string;
}
