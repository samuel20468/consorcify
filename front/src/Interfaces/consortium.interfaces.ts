// Interfaces
import { IAdmin } from './admin.interfaces';
import { IExpense } from './expenses.interfaces';
import { IFunctionalUnits } from './functionalUnits.interfaces';
import { ISupplier } from './suppliers.interfaces';

// --------------

// Interfaz de creación de nuevo consorcio
export interface INewConsortium {
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
    interest_rate: number;
    c_admin: string | IAdmin;
}

// Interfaz de error en la creación de un nuevo consorcio
export interface INewConsortiumError {
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
    category?: number | string;
    first_due_day?: number | string;
    interest_rate?: number | string;
    c_admin?: string | IAdmin;
}

// Interfaz de consorcio
export interface IConsortium {
    id: string;
    suterh_key: string;
    name: string;
    cuit: string;
    street_name: string;
    building_number: number;
    zip_code: number;
    country: string;
    province: string;
    city: string;
    floors: number;
    ufs: number;
    category: number;
    first_due_day: number;
    picture: string;
    interest_rate: number;
    latitude: number;
    longitude: number;
    active: boolean;
    c_admin: IAdmin;
    functional_units: IFunctionalUnits[];
    expenses: IExpense[];
    suppliers: ISupplier[];
}
