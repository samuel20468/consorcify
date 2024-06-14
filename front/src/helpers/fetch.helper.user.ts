// Interfaces
import { ILogin, IRegister, IUser } from "@/Interfaces/user.interfaces";

// Rutas
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ------------------

// Creación de usuario
export const registerFetch = async (
    registerData: IRegister
): Promise<IUser | any> => {
    try {
        const response = await fetch(`${apiUrl}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
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
        console.error("El error está en el registerFetch", error);
    }
};

// Inicio de sesión
export const loginFetch = async (userData: ILogin): Promise<void> => {
    try {
        const response = await fetch(`${apiUrl}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
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
        console.error("El error está en el loginFetch", error);
    }
};

// Autenticación Google
export const googleLogin = async (): Promise<void> => {
    try {
        const response = await fetch(`${apiUrl}/auth/auth0`, {
            method: "GET",
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
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error("El error está en el googleLogin", error);
    }
};

// Obtener todos los usuarios
export const getUsers = async (token: string): Promise<IUser[] | any> => {
    try {
        const response = await fetch(`${apiUrl}/users`, {
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
        console.log("El error está en el getUsers", error);
    }
};

// Obtener usuario por ID
export const getUserById = async (
    id: string,
    token: string
): Promise<IUser | any> => {
    try {
        const response = await fetch(`${apiUrl}/users/${id}`, {
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
        console.error("El error está en el getUserById", error);
    }
};

// Modificar un usuario
export const updateUser = async (
    data: IRegister,
    id: string,
    token: string
): Promise<IUser | any> => {
    try {
        const response = await fetch(`${apiUrl}/users/${id}`, {
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
        console.error("El error está en el updateUser", error);
    }
};

// Eliminar un usuario
export const deleteUser = async (id: string, token: string): Promise<void> => {
    try {
        const response = await fetch(`${apiUrl}/users/toggle-status/${id}`, {
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
        console.error("El error está en el deleteUser", error);
    }
};
