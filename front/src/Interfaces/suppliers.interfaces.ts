// Interfaces
import { IConsortium } from "./consortium.interfaces";

// ---------------------

// Interfaz de creación de un nuevo proveedor
export interface INewSupplier {
    name: string;
    cuit: string;
    email: string;
    phone_number: string;
    address: string;
    balance: number;
    consortium_id: string;
}

// Interfaz de error en la creación de un nuevo proveedor
export interface INewSupplierError {
    name?: string;
    cuit?: string;
    email?: string;
    phone_number?: string;
    address?: string;
    balance?: number;
    consortium_id?: string;
}

// Interfaz de proveedor
export interface ISupplier {
    id: string;
    name: string;
    cuit: string;
    email: string;
    phone_number: string;
    address: string;
    balance: number;
    active: boolean;
    consortium: IConsortium;
    expenditures: number;
}
