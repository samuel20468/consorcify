// Rutas
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ------------------

export const addFuncionalUnit = async (token: string, funcionalUnit: any) => {
    try {
        const response = await fetch(`${apiUrl}/funcional-units`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(funcionalUnit),
        });
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    } catch (error) {
        console.error(error);
    }
};
