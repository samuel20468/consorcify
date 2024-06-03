import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { User } from 'src/modules/users/entities/user.entity';
import { IUser } from 'src/utils/types';

@Injectable()
export class ExcludeSuperAdminInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.excludeSuperAdmin(item));
        } else {
          return this.excludeSuperAdmin(data);
        }
      }),
    );
  }
  private excludeSuperAdmin(data: User): IUser {
    if (data && data.active) {
      const { is_super_admin, ...dataWithoutSuperAdmin } = data;
      return dataWithoutSuperAdmin;
    }
    return data;
  }
}
