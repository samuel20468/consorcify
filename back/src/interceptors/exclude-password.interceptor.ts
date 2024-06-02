import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CAdmin } from 'src/modules/c-admin/entities/c-admin.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { ICAdmin, IUser } from 'src/utils/types';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.excludePassword(item));
        } else {
          return this.excludePassword(data);
        }
      }),
    );
  }
  private excludePassword(data: User | CAdmin): IUser | ICAdmin {
    if (data && data.password) {
      const { password, ...dataWithoutPassword } = data;
      return dataWithoutPassword;
    }
    return data;
  }
}
