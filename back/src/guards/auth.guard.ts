import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthCustomGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1] ?? '';

    if (!token) {
      throw new UnauthorizedException('Se requiere token');
    }
    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });
      user.iat = new Date(user.iat * 1000);
      user.exp = new Date(user.exp * 1000);
      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token Inválido');
    }
  }
}
