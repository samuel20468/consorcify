// Interfaces
import { IExpense } from './expenses.interfaces';
import { ISupplier } from './suppliers.interfaces';

// ------------------

// Interfaz de creación de nuevo gasto
export interface INewExpenditure {
    category: string;
    total_amount: number;
    description: string;
    date: string;
    invoice_number: string;
    supplier_id: string;
    consortium_id: string;
    expense_id: string;
}

// Interfaz de error en la creación de un nuevo gasto
export interface INewExpenditureError {
    category?: string;
    total_amount?: number;
    description?: string;
    date?: string;
    invoice_number?: string;
    supplier_id?: string;
    consortium_id?: string;
    expense_id?: string;
}

// Interfaz de Gasto
export interface IExpenditure {
    category: string;
    id: string;
    total_amount: number;
    description: string;
    date: string;
    status: string;
    invoice_number: string;
    active: boolean;
    expense: IExpense;
    supplier: ISupplier;
}
