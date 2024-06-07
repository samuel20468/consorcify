import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateCAdminDto } from '../c-admin/dto/create-c-admin.dto';
import { User } from '../users/entities/user.entity';
import { CAdmin } from '../c-admin/entities/c-admin.entity';
import { ExcludePasswordInterceptor } from 'src/interceptors/exclude-password.interceptor';
import { ExcludeActiveInterceptor } from 'src/interceptors/exclude-active.interceptor';
import { ExcludeSuperAdminInterceptor } from 'src/interceptors/exclude-super-admin.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { ROLE } from 'src/utils/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { VerifyEntity } from 'src/guards/verifyEntity.guard';
import { TObjectToken } from 'src/utils/types';


@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ExcludePasswordInterceptor, ExcludeActiveInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('auth0')
  @UseGuards(VerifyEntity)
  async auth0(@Req() req: Request) {
    const user = JSON.stringify(req.oidc?.user);
    if (!user) {
      throw new UnauthorizedException('Falla en autenticación de Auth0');
    }
    return await this.authService.auth0(JSON.parse(user));
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
  @Roles(ROLE.SUPERADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  async signUpCAdmin(@Body() consAdmin: CreateCAdminDto): Promise<CAdmin> {
    return await this.authService.singUpCAdmin(consAdmin);
  }
}
