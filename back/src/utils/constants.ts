// ENUMS, CONSTANTS
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: './.env.development' });

export const CADMIN_PASS = process.env.CADMIN_PASS;
export const CLIENT_URL: string = process.env.CLIENT_BASE_URL;
export const API_URL: string = process.env.API_BASE_URL;

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
  APARTMENT = 'Departamento',
  GARAGE = 'Garaje',
  COMMERCIAL_SPACE = 'Espacio Comercial',
  OFFICE = 'Oficina',
  OTHER = 'Otro',
}

export enum STATUS_MESSAGE {
  ACTIVATED = 'activated',
  DISABLED = 'disabled',
}

export enum FINANCIAL_STATUS {
  PENDING = 'Pendiente',
  APPROVED = 'Aprobado',
  REJECTED = 'Rechazado',
}

export enum EXPENSE_STATUS {
  OPEN = 'Abierta',
  CLOSED = 'Cerrada',
}

export enum EXPENDITURE_STATUS {
  UNPAID = 'impago',
  PAID = 'pagado',
}

export enum EXPENDITURE_CATEGORY {
  UTILITIES = 'Servicios Públicos',
  SERVICE_SUBSCRIPTION = 'Abono de Servicios',
  COMMON_AREA_MAINTENANCE = 'Mantenimiento de partes comunes',
  BANK_FEES = 'Gastos bancarios',
  CLEANING_EXPENSES = 'Gastos de limpieza',
  ADMINISTRATIVE_EXPENSES = 'Gastos administrativos',
  INSURANCES = 'Seguro',
  SALARIES = 'Sueldos',
  OTHER_EXPENSES = 'Otros',
}

export enum PAYMENT_STATUS {
  PAID = 'Pagado',
  UNPAID = 'Impago',
  PARTIAL = 'Parcial',
}
