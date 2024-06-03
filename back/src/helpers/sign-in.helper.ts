import { CAdmin } from 'src/modules/c-admin/entities/c-admin.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { checkPassword } from './hash-password.helper';
import { UnauthorizedException } from '@nestjs/common';
import { ROLE } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';
import { TObjectToken } from 'src/utils/types';

export const signInHelper = async (
  foundEntity: User | CAdmin,
  passwordEntity: string,
  jwtService: JwtService,
): Promise<TObjectToken> => {
  const verifyPassword = await checkPassword(
    passwordEntity,
    foundEntity.password,
  );
  if (!verifyPassword) {
    throw new UnauthorizedException('Invalid Credentials');
  }
  const role: ROLE[] = [];
  if (foundEntity instanceof CAdmin) {
    role.push(ROLE.CADMIN);
  } else if (foundEntity instanceof User) {
    if (foundEntity.is_super_admin) {
      role.push(ROLE.SUPERADMIN);
    } else {
      role.push(ROLE.USER);
    }
  }

  const userPayload = {
    id: foundEntity.id,
    email: foundEntity.email,
    roles: [...role],
  };
  const token = jwtService.sign(userPayload);
  return { token };
};
