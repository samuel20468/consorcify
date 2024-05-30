import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/utils/constants';

export const Roles = (...roles: ROLE[]) => SetMetadata('roles', roles);
