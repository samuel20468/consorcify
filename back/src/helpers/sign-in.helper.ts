import { CAdmin } from 'src/modules/c-admin/entities/c-admin.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { checkPassword } from './hash-password.helper';
import { UnauthorizedException } from '@nestjs/common';
import { ROLE } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';
import { TObjectToken } from 'src/utils/types';

export const assignRole = (entity: User | CAdmin): ROLE[] => {
  const role: ROLE[] = [];
  if (entity instanceof CAdmin) {
    role.push(ROLE.CADMIN);
  } else if (entity instanceof User) {
    if (entity.is_super_admin) {
      role.push(ROLE.SUPERADMIN);
    } else {
      role.push(ROLE.USER);
    }
  }
  return role;
};

export const generateToken = (
  entity: User | CAdmin,
  jwtService: JwtService,
): TObjectToken => {
  const role = assignRole(entity);
  const userPayload = {
    id: entity.id,
    email: entity.email,
    roles: role,
  };
  const token = jwtService.sign(userPayload);
  return { token };
};

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
    throw new UnauthorizedException('Credenciales Inválidas');
  }
  const token = generateToken(foundEntity, jwtService);
  return token;
};
