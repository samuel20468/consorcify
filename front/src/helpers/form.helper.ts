export interface IRegisterConsortium {
    name: string;
    adress: string;
    email: string;
    phone: string;
    adminName: string;
    adminEmail: string;
    adminPhone: string;
}

export interface IRegisterConsortiumError {
    name?: string;
    adress?: string;
    email?: string;
    phone?: string;
    adminName?: string;
    adminEmail?: string;
    adminPhone?: string;
}

export async function handleRegisterConsortium(
    registerConsortium: IRegisterConsortium
) {
    try {
        const response = await fetch(`http://localhost:3001`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerConsortium),
        });
        return response;

        // Definir que vamos a mostrar una vez creado el consorcio
    } catch (error: any) {
        throw new Error(error);
    }
}
