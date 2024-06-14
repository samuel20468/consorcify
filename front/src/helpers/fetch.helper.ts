export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const paymentCheckOut = async (token: string, id: string) => {
    try {
        const response = await fetch(`${apiUrl}/payments/${id}/check-out`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};
