import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateCAdminDto } from '../c-admin/dto/create-c-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() credentials: CredentialsDto): Promise<string> {
    return await this.authService.signIn(credentials);
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto): Promise<string> {
    return await this.authService.signUp(user);
  }

  @Post('register-c-admin')
  async signUpCAdmin(@Body() consAdmin: CreateCAdminDto): Promise<string> {
    return await this.authService.singUpCAdmin(consAdmin);
  }
}
