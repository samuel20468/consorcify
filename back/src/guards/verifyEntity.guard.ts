import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CAdminsRepository } from 'src/modules/c-admin/c-admin.repository';

@Injectable()
export class VerifyEntity implements CanActivate {
  constructor(private readonly cAdminsRepository: CAdminsRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.oidc.user;
    const foundCAdmin = await this.cAdminsRepository.findOneByEmail(user.email);
    if (foundCAdmin) {
      throw new ForbiddenException(
        'Como administrador debes ingresar con tus credenciales',
      );
    }
    return true;
  }
}
