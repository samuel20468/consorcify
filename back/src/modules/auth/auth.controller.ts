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
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ExcludePasswordInterceptor, ExcludeActiveInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() credentials: CredentialsDto): Promise<object> {
    return await this.authService.signIn(credentials);
  }

  @Get('signin/auth0')
  async signInAuth0(@Req() req: Request) {
    // console.log(req.oidc.idToken);
    const user = JSON.stringify(req.oidc?.user);
    if (!user) {
      throw new UnauthorizedException('Falla en autenticación de Auth0');
    }
    return await this.authService.signInAuth0(JSON.parse(user));
  }

  @Post('signup')
  @UseInterceptors(ExcludeSuperAdminInterceptor)
  async signUp(@Body() user: CreateUserDto): Promise<User> {
    return await this.authService.signUp(user);
  }

  @Get('signup/auth0')
  async getAuth0Protected(@Req() req: Request) {
    // console.log(req.oidc.idToken);
    const user = JSON.stringify(req.oidc?.user);
    if (!user) {
      throw new UnauthorizedException('Falla en autenticación de Auth0');
    }
    return await this.authService.signUpAuth0(JSON.parse(user));
  }

  @Post('register-c-admin')
  // @Roles(ROLE.SUPERADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  async signUpCAdmin(@Body() consAdmin: CreateCAdminDto): Promise<CAdmin> {
    return await this.authService.singUpCAdmin(consAdmin);
  }
}
