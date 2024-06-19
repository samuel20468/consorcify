// Interfaces
import { IFunctionalUnits } from './functionalUnits.interfaces';

// Interfaz de registro de usuario
export interface IRegister {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface IToken {
    token: string;
}

// Interfaz de error de registro de usuario
export interface IRegisterError {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
}

// Interfaz de logueo
export interface ILogin {
    email: string;
    password: string;
}

// Interfaz de error de logueo
export interface ILoginError {
    email?: string;
    password?: string;
}

// Interfaz de usuario
export interface IUser extends IRegister {
    id: string;
    picture: string;
    active: boolean;
    auth0: boolean;
    id_super_admin: boolean;
    functional_units: IFunctionalUnits[];
}

// Interfaz de la data del usuario
export interface IUserData {
    email: string;
    exp: number;
    iat: number;
    id: string;
    roles: string[];
}
