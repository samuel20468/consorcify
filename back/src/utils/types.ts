//TYPES and INTERFACES

import { FunctionalUnit } from 'src/modules/functional-units/entities/functional-unit.entity';
import { SAT, SUBJECT_MESSAGE } from './constants';
import { Consortium } from 'src/modules/consortiums/entities/consortium.entity';

// TYPES
export type TPagination = {
  page: number;
  limit: number;
};

export type TObjectToken = {
  token: string;
};

export type TContextMail = {
  user: string;
  email?: string;
  url: string;
  amount?: number;
  totalAmount?: number;
  nameConsortium?: string;
  nameExpense?: string;
  uF?: string;
  expirationDate?: Date;
};

// INTERFACES
export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  active?: boolean;
  is_super_admin?: boolean;
  funtional_units?: FunctionalUnit[];
}

export interface ICAdmin {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  cuit: string;
  address: string;
  sat: SAT;
  rpa: string;
  active?: boolean;
  consortiums?: Consortium[];
}

export interface ISupplier {
  id: string;
  name: string;
  cuit: string;
  email: string;
  phone_number: string;
  address: string;
  balance?: number;
}

export interface IMessage {
  id: string;
  sender: string;
  receiver: string;
  functional_unit: string;
  consortium: string;
  subject: SUBJECT_MESSAGE;
  content: string;
  timestamp: string;
  is_read?: boolean;
}
