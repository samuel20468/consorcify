// Interfaces
import { IConsortium } from "./consortium.interfaces";
import { IExpense } from "./expenses.interfaces";
import { IUser } from "./user.interfaces";

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
    balance?: number;
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
    expenses: IExpense[];
    user: IUser;
    functional_units_expenses: IFunctionalUnitExpenses[];
}

export interface IFunctionalUnitExpenses {
    id: string;
    interests: number;
    monthly_expenditure: number;
    previous_balance: number;
    total_amount: number;
    functional_unit: IFunctionalUnits;
    expense: IExpense;
    payment_status: string;
    created_at: string;
}
