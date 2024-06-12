// Interfaces
import { IConsortium } from "./consortium.interfaces";

// ------------------

// Interfaz de registro de admin
export interface INewRegisterAdmin {
    name: string;
    address: string;
    email: string;
    phone_number: string;
    cuit: string;
    sat: string;
    rpa: string;
}

// Interfaz de error de registro de admin
export interface INewRegisterAdminError {
    name?: string;
    address?: string;
    email?: string;
    phone_number?: string;
    cuit?: string;
    sat?: string;
    rpa?: string;
}

// Interfaz de admin
export interface IAdmin extends INewRegisterAdmin {
    id: string;
    password: string;
    picture: string;
    active: boolean;
    consortiums: IConsortium[];
}
