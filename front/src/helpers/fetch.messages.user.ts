import { INewMessage } from "@/Interfaces/messages.interfaces";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const newMessage = async (token: string, message: INewMessage) => {
    try {
        const response = await fetch(`${apiUrl}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(message),
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};
