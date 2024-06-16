// ENUMS, CONSTANTS
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: './.env.development' });

export const CADMIN_PASS: string = process.env.CADMIN_PASS;
export const CLIENT_URL: string = process.env.CLIENT_BASE_URL;
export const API_URL: string = process.env.API_BASE_URL;

//OAUTH STRATEGY
export const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET;

//NODEMAILER
export const MAIL_HOST: string = process.env.MAIL_HOST;
export const MAIL_USER: string = process.env.MAIL_USER;
export const MAIL_PASSWORD: string = process.env.MAIL_PASSWORD;
export const MAIL_FROM: string = process.env.MAIL_FROM;
export const MAIL_REDIRECT_URL: string = process.env.MAIL_REDIRECT_URL;

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

export enum SUBJECT_MAIL {
  NEW_ACCOUNT = 'Confirmación de cuenta en Consorcify',
  NEW_PASSWORD = 'Reestablecer contraseña en Consorcify',
  NEW_EXPENSE = 'Confirmación de expensa generada',
  INDIVIDUAL_EXPENSE = 'Nueva expensa para abonar',
  SUCCESSFUL_PAYMENT = 'Pago de expensa realizado con éxito',
  PAYMENT_REMINDER = 'Recordatorio de pago de expensa',
}

export enum TEMPLATES_MAIL {
  WELCOME_USER = './welcome',
  WELCOME_CADMIN = './welcome-cadmin',
  NEW_PASSWORD = './reset-password',
  NEW_EXPENSE = './new-expense',
  INDIVIDUAL_EXPENSE = './individual-expense',
  SUCCESSFUL_PAYMENT = './successful-payment',
  PAYMENT_REMINDER = './payment-reminder',
}
