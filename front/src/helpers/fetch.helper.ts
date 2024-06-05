import {
    IConsortium,
    ILoginData,
    IRegisterConsortium,
} from "@/Interfaces/Interfaces";

export const loginFetch = async (UserData: ILoginData) => {
    try {
        const response = await fetch("http://localhost:3001/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(UserData),
        });
        if (!response.ok) {
            throw new Error("Error al inicar Sesion");
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const registerFetch = async (registerData: any) => {
    try {
        const response = await fetch("http://localhost:3001/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });
        if (!response.ok) {
            throw new Error("Error al Registrarse");
        }
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getAdminById = async (id: string, token: string) => {
    try {
        const response = await fetch(`http://localhost:3001/c-admins/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (error) {}
};

export const getAdmins = async (token: string) => {
    try {
        const response = await fetch("http://localhost:3001/c-admins", {
            method: "GET",
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

export const deleteAdmin = async (id: string, token: string) => {
    try {
        const response = await fetch(
            `http://localhost:3001/c-admins/disable/${id}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {}
};

export const updateAdmin = async (
    data: IRegisterConsortium,
    id: string,
    token: string
) => {
    try {
        const response = await fetch(`http://localhost:3001/c-admins/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
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

//? ENDPOINTS USUARIOS
export const getUserById = async (id: string, token: string) => {
    try {
        const response = await fetch(`http://localhost:3001/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (error) {}
};

//? endpoint consorcios
export const getConsortiums = async (token: string) => {
    try {
        const response = await fetch("http://localhost:3001/consortiums", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getConsortiumById = async (id: string, token: string) => {
    try {
        const response = await fetch(
            `http://localhost:3001/consortiums/${id}`,
            {
                method: "GET",
                cache: "no-cache",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();
        return data;
    } catch (error) {}
};

export const updateConsortium = async (
    id: string,
    token: string,
    data: IConsortium
) => {
    try {
        const response = await fetch(
            `http://localhost:3001/consortiums/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
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
        }
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const deleteConsortiumById = async (id: string, token: string) => {
    try {
        const response = await fetch(
            `http://localhost:3001/consortiums/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);
        return response;
    } catch (error) {}
};
