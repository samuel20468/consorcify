// Interfaces
import { IConsortium } from "./consortium.interfaces";

// -------------------

// Interfaz de creación de una nueva unidad funcional
export interface INewFunctionalUnits {
    type: string;
    location: string;
    number: string;
    owner: string;
    owner_phone_number: string;
    owner_email: string;
    balance: number;
    consortium_id: string;
}

// Interfaz de error en la creación de una nueva unidad funcional
export interface INewFunctionalUnitsError {
    type?: string;
    location?: string;
    number?: string;
    owner?: string;
    owner_phone_number?: string;
    owner_email?: string;
    balance?: string;
    consortium_id?: string;
}

// Interfaz de unidad funcional
export interface IFunctionalUnits {
    id: string;
    type: string;
    location: string;
    number: string;
    owner: string;
    owner_phone_number: string;
    owner_email: string;
    balance: number;
    code: string;
    active: boolean;
    consortium: IConsortium;
}
