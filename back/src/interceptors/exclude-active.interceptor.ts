import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CAdmin } from 'src/modules/c-admin/entities/c-admin.entity';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { ICAdmin, ISupplier, IUser } from 'src/utils/types';

@Injectable()
export class ExcludeActiveInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.excludeActive(item));
        } else {
          return this.excludeActive(data);
        }
      }),
    );
  }
  private excludeActive(
    data: User | CAdmin | Supplier,
  ): IUser | ICAdmin | ISupplier {
    if (data && data.active) {
      const { active, ...dataWithoutActive } = data;
      return dataWithoutActive;
    }
    return data;
  }
}
