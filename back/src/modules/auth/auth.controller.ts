import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateCAdminDto } from '../c-admin/dto/create-c-admin.dto';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { ExcludePasswordInterceptor } from 'src/interceptors/exclude-password.interceptor';
import { ExcludeActiveInterceptor } from 'src/interceptors/exclude-active.interceptor';
import { ExcludeSuperAdminInterceptor } from 'src/interceptors/exclude-super-admin.interceptor';
import { AuthCustomGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { ROLE } from 'src/utils/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { TObjectToken } from 'src/utils/types';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ExcludePasswordInterceptor, ExcludeActiveInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req: any, @Res() res: Response) {
    const user = req.user;
    const token = user.accesstoken;
    res.redirect(`http://localhost:3000/login?token=${token}`);
  }

  @Post('signin')
  async signIn(@Body() credentials: CredentialsDto): Promise<object> {
    return await this.authService.signIn(credentials);
  }

  @Post('signup')
  @UseInterceptors(ExcludeSuperAdminInterceptor)
  async signUp(@Body() user: CreateUserDto): Promise<TObjectToken> {
    return await this.authService.signUp(user);
  }

  @Post('register-c-admin')
  // @Roles(ROLE.SUPERADMIN)
  // @UseGuards(AuthCustomGuard, RolesGuard)
  @ApiBearerAuth()
  async signUpCAdmin(@Body() consAdmin: CreateCAdminDto): Promise<CAdmin> {
    return await this.authService.singUpCAdmin(consAdmin);
  }
}
