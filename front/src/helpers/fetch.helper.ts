import {
    IConsortium,
    IExpense,
    ILoginData,
    INewExpense,
    IRegisterAdmin,
    ISuppliers,
    IUser,
} from '@/Interfaces/Interfaces';
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Inicio de sesión
export const loginFetch = async (UserData: ILoginData) => {
    try {
        const response = await fetch(`${apiUrl}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UserData),
        });
        if (!response.ok) {
            throw new Error('Error al inicar Sesion');
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

// Creación de usuario
export const registerFetch = async (registerData: IUser) => {
    try {
        const response = await fetch(`${apiUrl}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });
        if (!response.ok) {
            throw new Error('Error al Registrarse');
        }
        return response;
    } catch (error) {
        console.error(error);
    }
};

// Obtener usuario por ID
export const getUserById = async (id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {}
};

// Creación del administrador
export async function adminFetch(registerAdmin: IRegisterAdmin, token: string) {
    try {
        const response = await fetch(`${apiUrl}/auth/register-c-admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        }

        return response;
    } catch (error: any) {
        throw new Error(error);
    }
}

// Obtener administrador
export const getAdmins = async (token: string) => {
    try {
        const response = await fetch(`${apiUrl}/c-admins`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

// Obtener administrador por ID
export const getAdminById = async (id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/c-admins/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

// Borrar administrador
export const deleteAdmin = async (id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/c-admins/disable/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {}
};

// Modificar administrador
export const updateAdmin = async (
    data: IRegisterAdmin,
    id: string,
    token: string
) => {
    try {
        const response = await fetch(`${apiUrl}/c-admins/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const data = await response.json();
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

// Creación de consorcios
export async function consortiumFetch(
    consortiumData: IConsortium,
    token: string
) {
    try {
        const response = await fetch(`${apiUrl}/consortiums`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        }
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
}

// Obtener consorcios
export const getConsortiums = async (token: string) => {
    try {
        const response = await fetch(`${apiUrl}/consortiums`, {
            method: 'GET',
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

// Obtener consorcio por ID
export const getConsortiumById = async (id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/consortiums/${id}`, {
            method: 'GET',
            cache: 'no-cache',
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

// Modificar consorcio
export const updateConsortium = async (
    id: string,
    token: string,
    data: IConsortium
) => {
    try {
        const response = await fetch(`${apiUrl}/consortiums/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        console.log(response);
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

// Borrar consorcio
export const deleteConsortiumById = async (id: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}/consortiums/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (error) {}
};

// Crear proveedor
export const supplierFetch = async (
    registerSupplier: ISuppliers,
    token: string
) => {
    try {
        const response = await fetch(`${apiUrl}/suppliers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            const data = await response.json();
            return data;
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
                'Content-Type': 'application/json',
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
            const data = response.json();
            return data;
        }
        return undefined;
    } catch (error) {
        console.error(error);
    }
};
