import { ILogedUser, ILoginData } from "@/Interfaces/Interfaces";
import React from "react";

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
        });
        console.log(response);

        return response;
    } catch (error) {}
};
