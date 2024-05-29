export interface ILoginData {
    email: string;
    password: string;
}

export interface ILoginDataError {
    email?: string;
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
    password?: string;
    role: string;
}

export interface IAdmin extends IUser {
    phone: number;
    address: string;
    cuit: string;
    rpa: number;
    sat: string;
}

// registro de usuario Dto
//name, lastname, email, password
