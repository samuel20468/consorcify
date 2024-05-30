import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateCAdminDto } from '../c-admin/dto/create-c-admin.dto';
import { User } from '../users/entities/user.entity';
import { CAdmin } from '../c-admin/entities/c-admin.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() credentials: CredentialsDto): Promise<object> {
    return await this.authService.signIn(credentials);
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto): Promise<User> {
    return await this.authService.signUp(user);
  }

  @Post('register-c-admin')
  async signUpCAdmin(@Body() consAdmin: CreateCAdminDto): Promise<CAdmin> {
    return await this.authService.singUpCAdmin(consAdmin);
  }
}
