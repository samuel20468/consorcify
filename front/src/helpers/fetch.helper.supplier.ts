// Interfaces
import { INewSupplier } from "@/Interfaces/suppliers.interfaces";

// Rutas
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ------------------

// Creación de proveedor
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
        } else {
            return response;
        }
    } catch (error) {
        console.error("El error está en el supplierFetch", error);
    }
};

// Obtener todos los proveedores
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
        console.error("El error está en el getSuppliers", error);
    }
};

// Obtener proveedor por ID
export const getSupplierById = async (token: string, id: string) => {
    try {
        const response = await fetch(`${apiUrl}/suppliers/${id}`, {
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
        console.error("El error está en el getSupplierById", error);
    }
};

// Modificar proveedor
export const updateSupplier = async (
    id: string,
    token: string,
    data: INewSupplier
) => {
    try {
        const response = await fetch(`${apiUrl}/suppliers/${id}`, {
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
        console.error("El error está en el updateSupplier", error);
    }
};

// Borrar un proveedor
export const deleteSupplier = async (id: string, token: string) => {
    try {
        const response = await fetch(
            `${apiUrl}/suppliers/toggle-status/${id}`,
            {
                method: "PATCH",
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
        console.error("El error está en el deleteSupplier", error);
    }
};
