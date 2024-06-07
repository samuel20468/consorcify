import {
  Body,
  Controller,
  Post,
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

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ExcludePasswordInterceptor, ExcludeActiveInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() credentials: CredentialsDto): Promise<object> {
    return await this.authService.signIn(credentials);
  }

  @Post('signup')
  @UseInterceptors(ExcludeSuperAdminInterceptor)
  async signUp(@Body() user: CreateUserDto): Promise<User> {
    return await this.authService.signUp(user);
  }

  @Post('register-c-admin')
  @ApiBearerAuth()
  @Roles(ROLE.SUPERADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async signUpCAdmin(@Body() consAdmin: CreateCAdminDto): Promise<CAdmin> {
    return await this.authService.singUpCAdmin(consAdmin);
  }
}
