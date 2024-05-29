import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterConsAdminDto } from './dto/register-cons-admin.dto';

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
  async registerConsAdmin(
    @Body() consAdmin: RegisterConsAdminDto,
  ): Promise<string> {
    return await this.authService.registerConsAdmin(consAdmin);
  }
}
