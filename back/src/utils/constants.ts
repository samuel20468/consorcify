// ENUMS, CONSTANTS
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: './.env.development' });

export const CADMIN_PASS = process.env.CADMIN_PASS;

export enum SAT {
  MONOTAX = 'Monotributo',
  REGISTERED_RESPONSIBLE = 'Responsable Inscripto',
  NON_REGISTERED_RESPONSIBLE = 'Responsable No Inscripto',
  EXEMPT = 'Exento',
}

export enum ROLE {
  CADMIN = 'cadmin',
  USER = 'user',
  SUPERADMIN = 'superadmin',
}

export enum FUNCTIONAL_UNIT_TYPE {
  APARTMENT = 'Apartmento',
  GARAGE = 'Garaje',
  COMMERCIAL_SPACE = 'Espacio Comercial',
  OFFICE = 'Oficina',
  OTHER = 'Otro',
}

export enum STATUS {
  ACTIVATED = 'activated',
  DISABLED = 'disabled',
}
