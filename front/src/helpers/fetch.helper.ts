import { ILoginData } from "@/Interfaces/Interfaces";
import { log } from "console";

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

export const getAdminById = async (id: any, token: any) => {
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

export const getAdmins = async () => {
    try {
        const response = await fetch("http://localhost:3001/c-admins", {
            method: "GET",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

//? ENDPOINTS USUARIOS
export const getUserById = async (id: any, token: any) => {
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
export const getConsortiums = async () => {
    try {
        const response = await fetch("http://localhost:3001/consortiums", {
            method: "GET",
            cache: "no-cache",
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getConsortiumById = async (id: string) => {
    try {
        const response = await fetch(
            `http://localhost:3001/consortiums/${id}`,
            {
                method: "GET",
            }
        );

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {}
};

export const deleteConsortiumById = async (id: string) => {
    try {
        const response = await fetch(
            `http://localhost:3001/consortiums/${id}`,
            {
                method: "DELETE",
            }
        );
        console.log(response);
        return response;
    } catch (error) {}
};
