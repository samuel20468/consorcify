export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Autenticación Google
export const googleLogin = async () => {
    try {
        const response = await fetch(`${apiUrl}/auth/auth0`, {
            method: "GET",
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

export const paymentCheckOut = async (
    token: string,
    id: string,
    amount: number
) => {
    try {
        const response = await fetch(
            `${apiUrl}/payments/${id}/${amount}/check-out`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};
