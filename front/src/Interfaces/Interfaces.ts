export interface ILoginData {
    email: string;
    password: string;
}

export interface ILoginDataError {
    email: string;
    password?: string;
}

export interface ILogedUser {
    token: string;
    user: IUser;
}

export interface IUser {
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}

export interface IAdmin extends IUser {
    phone: number;
    address: string;
    cuit: string;
    rpa: string;
    sat: string;
}

export interface IRegisterConsortium {
    name: string;
    email: string;
    password?: string;
    phone_number: string;
    cuit: string;
    address: string;
    sat: string;
    rpa: string;
}

export interface IRegisterConsortiumError {
    name?: string;
    email?: string;
    password?: string;
    phone_number?: string;
    cuit?: string;
    adress?: string;
    sat?: string;
    rpa?: string;
}
export interface IConsortium {
    id: string;
    suterh_key: string;
    name: string;
    cuit: string;
    street_name: string;
    building_number: number;
    zip_code: string;
    country: string;
    province: string;
    city: string;
    floors: number;
    ufs: number;
    category: number;
    first_due_day: number;
}
export interface IConsortiumError {
    id?: string;
    suterh_key?: string;
    name?: string;
    cuit?: string;
    street_name?: string;
    building_number?: number;
    zip_code?: string;
    country?: string;
    province?: string;
    city?: string;
    floors?: number;
    ufs?: number;
    category?: number;
    first_due_day?: number;
}
