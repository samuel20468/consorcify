// Interfaces
import {
    IExpenditure,
    INewExpenditure,
} from "@/Interfaces/expenditures.interfaces";

// Rutas
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ------------------

// Creación de gastos
export const expenditureFetch = async (
    token: string,
    newExpenditure: INewExpenditure
): Promise<IExpenditure | any> => {
    try {
        const response = await fetch(`${apiUrl}/expenditures`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newExpenditure),
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(`
                    Error ${response.status}: ${
                    errorInfo.message || response.statusText
                }
            `);
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error("El error está en el expenditureFetch", error);
    }
};

// Obtener todos los gastos
export const getExpenditures = async (
    token: string,
    page: number = 1,
    limit: number = 20
): Promise<IExpenditure[] | any> => {
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
        console.error("El error está en el getExpenditures", error);
    }
};

// Obtener un gasto por ID
export const getExpeditureById = async (
    token: string,
    id: string
): Promise<IExpenditure | any> => {
    try {
        const response = await fetch(`${apiUrl}/expenditures/${id}`, {
            method: "GET",
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
            return response;
        }
    } catch (error) {
        console.error("El error está en el getExpenditureById", error);
    }
};

// Modificar un gasto
export const updateExpenditure = async (
    id: string,
    token: string,
    data: INewExpenditure
): Promise<IExpenditure | any> => {
    try {
        const response = await fetch(`${apiUrl}/expenditures/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
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
        console.error("El error está en el updateExpenditure", error);
    }
};

// Borrar un gasto
export const deleteExpenditure = async (
    id: string,
    token: string
): Promise<any> => {
    try {
        const response = await fetch(`${apiUrl}/expenditures/disable/${id}`, {
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
            return response;
        }
    } catch (error) {
        console.error("El error está en el deleteExpenditure", error);
    }
};
