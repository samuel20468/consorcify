import { INewRegisterAdmin } from "@/Interfaces/admin.interfaces";

// Rutas
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ------------------

// Creación de administrador
export const adminFetch = async (
    registerAdmin: INewRegisterAdmin,
    token: string
) => {
    try {
        const response = await fetch(`${apiUrl}/auth/register-c-admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(registerAdmin),
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
        console.error("El error está en el adminFetch", error);
    }
};

// Obtener todos los administradores
export const getAdmins = async (
    token: string,
    page: number = 1,
    limit: number = 5
) => {
    try {
        const response = await fetch(
            `${apiUrl}/c-admins?page=${page}&limit=${limit}`,
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
        console.error("El error está en el getAdmins", error);
    }
};

// Obtener administrador por ID
export const getAdminById = async (id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/c-admins/${id}`, {
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
        console.error("El error está en el getAdmins", error);
    }
};

// Modificar un administrador
export const updateAdmin = async (
    data: INewRegisterAdmin,
    id: string,
    token: string
) => {
    try {
        const response = await fetch(`${apiUrl}/c-admins/${id}`, {
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
        console.error("El error está en el updateAdmin", error);
    }
};

// Borrar un administrador
export const deleteAdmin = async (id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/c-admins/disable/${id}`, {
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
        console.error("El error está en el deleteAdmin", error);
    }
};
