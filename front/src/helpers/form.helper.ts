import { IRegisterConsortium } from "@/Interfaces/Interfaces";

export async function adminFetch(
    registerAdmin: IRegisterConsortium,
    token: string
) {
    console.log(registerAdmin);

    try {
        const response = await fetch(
            `http://localhost:3001/auth/register-c-admin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(registerAdmin),
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

        // Definir que vamos a mostrar una vez creado el consorcio
    } catch (error: any) {
        throw new Error(error);
    }
}
