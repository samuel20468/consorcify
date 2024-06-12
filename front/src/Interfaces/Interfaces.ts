export interface IConsortium {
    id?: string;
    suterh_key: string;
    name: string;
    cuit?: string;
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
    interest_rate: number | string;
    picture?: string;
    c_admin?: string;
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
    interest_rate?: string | number;
    c_admin?: string;
}

export interface IUFs {
    type: string;
    location: string;
    number: string;
    owner: string;
    owner_phone_number: string;
    owner_email: string;
    balance: number;
    consortium_id: string;
}

export interface ISuppliers {
    id?: string;
    consortium_id?: string;
    name: string;
    cuit: string;
    email: string;
    phone_number: string;
    address: string;
    balance: number;
    active?: boolean;
}
export interface ISuppliersError {
    id?: string;
    consortium_id?: string;
    name?: string;
    cuit?: string;
    email?: string;
    phone_number?: string;
    address?: string;
    balance?: number;
    active?: boolean;
}

export interface IExpenditures {
    id?: string;
    expense_id: string;
    supplier_id: string;
    consortium_id: string;
    date: string;
    total_amount: number;
    status?: string;
    category: string;
    invoice_number: string;
    description: string;
    active?: boolean;
}

export interface IExpendituresErrors {
    id?: string;
    expense_id?: string;
    supplier_id?: string;
    date?: string;
    total_amount?: number;
    status?: string;
    category?: string;
    invoice_number?: string;
    description?: string;
    active?: boolean;
}
export interface INewExpense {
    issue_date?: string;
    expiration_date?: string;
    consortium_id?: string;
    name?: string;
}

export interface IExpense {
    id: string;
    name: string;
    issue_date: string;
    expiration_date: string;
    total_amount: number;
    status: string;
    active: boolean;
    consortium: IConsortium;
    expenditures: IExpenditures[];
    functional_units_expenses: [];
}
