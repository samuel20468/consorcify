// Interfaces
import { IConsortium } from "./consortium.interfaces";
import { IExpenditure } from "./expenditures.interfaces";

// Interfaz de creación de una nueva expensa
export interface INewExpense {
    issue_date: string;
    expiration_date: string;
    consortium_id: string;
    name: string;
}

// Interfaz de error en la creación de una nueva expensa
export interface INewExpenseError {
    issue_date?: string;
    expiration_date?: string;
    consortium_id?: string;
    name?: string;
}

// Interfaz de expensa
export interface IExpense {
    id: string;
    name: string;
    issue_date: string;
    expiration_date: string;
    total_amount: number;
    status: string;
    active: boolean;
    consortium: IConsortium;
    expenditures: IExpenditure[];
    functional_units_expenses: [];
}
