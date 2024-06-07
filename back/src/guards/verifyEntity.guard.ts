import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CAdminsRepository } from 'src/modules/c-admin/c-admin.repository';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class VerifyEntity implements CanActivate {
  constructor(
    private readonly cAdminsRepository: CAdminsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.oidc.user;
    const foundCAdmin = await this.cAdminsRepository.findOneByEmail(user.email);
    const foundUser = await this.usersRepository.findOneByEmail(user.email);
    if (foundCAdmin || !foundUser.auth0) {
      throw new ForbiddenException('Debes ingresar con tus credenciales');
    }
    return true;
  }
}
