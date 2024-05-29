import { ILogedUser, ILoginData } from "@/Interfaces/Interfaces";
import React from "react";

export const loginFetch = async (UserData: ILoginData) => {
    try {
        const response = await fetch("http://localhost:3001", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(UserData),
        });
        if (!response.ok) {
            throw new Error("Error al inicar Sesion");
        }
        return response;
    } catch (error) {
        console.error(error);
    }
};
