import {
    IFunctionalUnitExpenses,
    IFunctionalUnits,
    INewFunctionalUnits,
} from "@/Interfaces/functionalUnits.interfaces";

// Rutas
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ------------------

export const addFuncionalUnit = async (
    token: string,
    funcionalUnit: INewFunctionalUnits
): Promise<IFunctionalUnits | any> => {
    try {
        const response = await fetch(`${apiUrl}/functional-units`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(funcionalUnit),
        });
        if (response.ok) {
            return response.json();
        } else {
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

export const getFuncionalUnits = async (
    token: string,
    consortiumId: string,
    page: number = 1,
    limit: number = 10
): Promise<IFunctionalUnits[] | any> => {
    try {
        const respose = await fetch(
            `${apiUrl}/functional-units/consortium/${consortiumId}?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (respose.ok) {
            return respose.json();
        } else {
            return respose.json().then((errorInfo) => {
                throw new Error(
                    `Error ${respose.status}: ${
                        errorInfo.message || respose.statusText
                    }`
                );
            });
        }
    } catch (error) {
        console.error(error);
    }
};

export const getFuncionalUnitByID = async (
    id: string,
    token: string
): Promise<IFunctionalUnits | any> => {
    try {
        const response = await fetch(`${apiUrl}/functional-units/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return response.json();
        } else {
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

export const getFuncionalUnitByUser = async (
    id: string,
    token: string
): Promise<IFunctionalUnits | any> => {
    try {
        const response = await fetch(`${apiUrl}/functional-units/${id}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return response.json();
        } else {
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

export const linkFunctionalUnit = async (
    id: string,
    token: string,
    code: string
) => {
    try {
        const response = await fetch(
            `${apiUrl}/functional-units/${code}/users/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            return response.json();
        } else {
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

export const functionalUnitExpensesId = async (
    id: string,
    token: string
): Promise<IFunctionalUnitExpenses | any> => {
    try {
        const response = await fetch(
            `${apiUrl}/functional-units-expenses/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            const datos = await response.json();
            return datos;
        } else {
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
