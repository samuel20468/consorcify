import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE } from 'src/utils/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requieredRoles = this.reflector.getAllAndOverride<ROLE[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const hasRole = () =>
      requieredRoles.some((role) => user?.roles?.includes(role));
    const valid = user && user.roles && hasRole();

    if (!valid) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a esta ruta',
      );
    }
    return valid;
  }
}
