import { INewConsortium } from "@/Interfaces/consortium.interfaces";

// Rutas
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ------------------

// Creación de consorcio
export const consortiumFetch = async (
    consortiumData: INewConsortium,
    token: string
) => {
    try {
        const response = await fetch(`${apiUrl}/consortiums`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(consortiumData),
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
        console.error("El error está en el consortiumFetch", error);
    }
};

// Obtener los consorcios
export const getConsortiums = async (token: string) => {
    try {
        const response = await fetch(`${apiUrl}/consortiums`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
        console.error("El error está en el getConsortiums", error);
    }
};

// Obtener un consorcio por ID
export const getConsortiumById = async (id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/consortiums/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
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
        console.error("El error está en el getConsortiumById", error);
    }
};

// Modificar consorcio
export const updateConsortium = async (
    id: string,
    token: string,
    data: INewConsortium
) => {
    try {
        const response = await fetch(`${apiUrl}/consortiums/${id}`, {
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
        console.error("El error está en el updateConsortium", error);
    }
};

// Borrar consorcio
export const deleteConsortium = async (id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/consortiums/disable/${id}`, {
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
        console.error("El error está en el deleteConsortium", error);
    }
};
