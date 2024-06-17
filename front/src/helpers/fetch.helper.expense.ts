// Interfaces
import { IExpense, INewExpense } from "@/Interfaces/expenses.interfaces";

// Rutas
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ------------------

// Creación de expensa
export const expenseFetch = async (
    token: string,
    newExpense: INewExpense
): Promise<IExpense | any> => {
    try {
        const response = await fetch(`${apiUrl}/expenses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newExpense),
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(
                    `Error ${response.status}: ${
                        errorInfo.message || response.statusText
                    }`
                );
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error("El error está en el expenseFetch", error);
    }
};

// Obtener todas las expensas
export const getExpenses = async (
    token: string,
    page: number = 1,
    limit: number = 5
): Promise<IExpense[] | any> => {
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
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(
                    `Error ${response.status}: ${
                        errorInfo.message || response.statusText
                    }`
                );
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error("El error está en el getExpenses", error);
    }
};

// Obtener expensa por ID
export const getExpenseById = async (
    token: string,
    id: string
): Promise<IExpense | any> => {
    try {
        const response = await fetch(`${apiUrl}/expenses/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(
                    `Error ${response.status}: ${
                        errorInfo.message || response.statusText
                    }`
                );
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error("El error está en el getExpenseById", error);
    }
};

// Liquidar expensa
export const settleExpense = async (token: string, id: string) => {
    try {
        const response = await fetch(`${apiUrl}/expenses/${id}/settle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(
                    `Error ${response.status}: ${
                        errorInfo.message || response.statusText
                    }`
                );
            });
        } else {
            const data = response.json();
            return data;
        }
    } catch (error) {
        console.error("El error está en el settleExpense", error);
    }
};

// Cerrar expensa
export const closeExpense = async (token: string, id: string) => {
    try {
        const response = await fetch(`${apiUrl}/expenses/${id}/close-expense`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(
                    `Error ${response.status}: ${
                        errorInfo.message || response.statusText
                    }`
                );
            });
        } else {
            const data = response.json();
            return data;
        }
    } catch (error) {
        console.error("El error está en el closeExpense", error);
    }
};

// Borrar expensa
export const deleteExpense = async (
    id: string,
    token: string
): Promise<void> => {
    try {
        const response = await fetch(`${apiUrl}/expenses/toggle-status/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(
                    `Error ${response.status}: ${
                        errorInfo.message || response.statusText
                    }`
                );
            });
        } else {
            const data = response.json();
            return data;
        }
    } catch (error) {
        console.error("El error está en el deleteExpense", error);
    }
};
