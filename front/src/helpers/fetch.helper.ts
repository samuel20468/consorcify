import { IExpenditures, IExpense, INewExpense } from "@/Interfaces/Interfaces";
import { INewSupplier } from "@/Interfaces/suppliers.interfaces";
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Crear proveedor
export const supplierFetch = async (
    registerSupplier: INewSupplier,
    token: string
) => {
    try {
        const response = await fetch(`${apiUrl}/suppliers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(registerSupplier),
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(
                    `Error ${response.status}: ${
                        errorInfo.message || response.statusText
                    }`
                );
            });
        }
        return response;
    } catch (error) {
        console.error(error);
    }
};

// Obtener proveedores
export const getSuppliers = async (
    token: string,
    page: number = 1,
    limit: number = 20
) => {
    try {
        const response = await fetch(
            `${apiUrl}/suppliers?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            return response;
        }
    } catch (error) {
        console.error(error);
    }
};

// Obtener proveedor por ID
export const getSuppliersById = async (id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/suppliers/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

// Autenticación Google
export const googleLogin = async () => {
    try {
        const response = await fetch(`${apiUrl}/auth/auth0`, {
            method: "GET",
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

// Crear expensa
export const newExpense = async (
    token: string,
    expense: INewExpense
): Promise<IExpense | undefined> => {
    try {
        const response = await fetch(`${apiUrl}/expenses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(expense),
        });
        if (response.ok) {
            response;
        }
        return undefined;
    } catch (error) {
        console.error(error);
    }
};

// Obtener expensas
export const getExpenses = async (
    token: string,
    page: number = 1,
    limit: number = 20
) => {
    try {
        const response = await fetch(
            `${apiUrl}/expenses?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            return response;
        }
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};

export const getExpensesById = async (token: string, id: string) => {
    try {
        const response = await fetch(`${apiUrl}/expenses/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = response.json();
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

// Crear gasto
export const expenditureFetch = async (
    token: string,
    expenditure: IExpenditures
) => {
    try {
        const response = await fetch(`${apiUrl}/expenditures`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(expenditure),
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(`
                    Error ${response.status}: ${
                    errorInfo.message || response.statusText
                }
            `);
            });
        }
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

// Obtener gastos
export const getExpenditures = async (
    token: string,
    page: number = 1,
    limit: number = 20
) => {
    try {
        const response = await fetch(
            `${apiUrl}/expenditures?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            return response;
        }
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(
                    `Error ${response.status}: ${
                        errorInfo.message || response.statusText
                    }`
                );
            });
        }
    } catch (error) {
        console.error(error);
    }
};

export const settleExpense = async (token: string, id: string) => {
    try {
        const response = await fetch(`${apiUrl}/expenses/${id}/settle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = response.json();
            return data;
        }
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(
                    `Error ${response.status}: ${
                        errorInfo.message || response.statusText
                    }`
                );
            });
        }
    } catch (error) {
        console.error(error);
    }
};

export const closeExpense = async (token: string, id: string) => {
    try {
        const response = await fetch(`${apiUrl}/expenses/${id}/close-expense`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = response.json();
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

export const paymentCheckOut = async (token: string, id: string) => {
    try {
        const response = await fetch(`${apiUrl}/payments/${id}/check-out`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};
