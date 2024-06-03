//TYPES and INTERFACES

import { FunctionalUnit } from 'src/modules/functional-units/entities/functional-unit.entity';
import { SAT } from './constants';
import { Consortium } from 'src/modules/consortiums/entities/consortium.entity';

// TYPES
export type TPagination = {
  page: number;
  limit: number;
};

export type TObjectToken = {
  token: string;
};

export type TDuplicateCheck = {
  value: string;
  field: string;
  errorMessage: string;
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
