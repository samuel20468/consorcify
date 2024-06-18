import { IMessage } from "@/Interfaces/message.interfaces";
import { apiUrl } from "./fetch.helper.admin";

export const getMessagesForUser = async (
    userId: string,
    token: string
): Promise<IMessage[] | any> => {
    try {
        const response = await fetch(`${apiUrl}/messages/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(`
                    Error ${response.status}: ${
                    errorInfo.message || response.statusText
                }`);
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error(error, "Error de la petición getMessagesForUser");
    }
};

export const getMessagesForUser = async (
    userId: string,
    token: string
): Promise<IMessage[] | any> => {
    try {
        const response = await fetch(`${apiUrl}/messages/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(`
                    Error ${response.status}: ${errorInfo.message || response.statusText}`);
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error(error, 'Error de la petición getMessagesForUser');
    }
};

export const getMessagesForCAdminInConsortium = async (
    cadminId: string,
    consortiumId: string,
    token: string
): Promise<IMessage[] | any> => {
    try {
        const response = await fetch(
            `${apiUrl}/messages/cadmin/${cadminId}/consortium/${consortiumId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(`
                    Error ${response.status}: ${
                    errorInfo.message || response.statusText
                }`);
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error(
            error,
            "Error de la petición getMessagesForCAdminInConsortium"
        );
    }
};

export const getMessageById = async (
    messageId: string,
    token: string
): Promise<IMessage[] | any> => {
    try {
        const response = await fetch(`${apiUrl}/messages/${messageId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(`
                    Error ${response.status}: ${
                    errorInfo.message || response.statusText
                }`);
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error(error, "Error de la petición getMessageById");
    }
};

export const markAsRead = async (
    messageId: string,
    token: string
): Promise<IMessage[] | any> => {
    try {
        const response = await fetch(`${apiUrl}/messages/${messageId}/read`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(`
                    Error ${response.status}: ${
                    errorInfo.message || response.statusText
                }`);
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error(error, "Error de la petición markAsRead");
    }
};

export const deleteMessageFromCAdmin = async (
    cadminId: string,
    messageId: string,
    token: string
): Promise<IMessage[] | any> => {
    try {
        const response = await fetch(
            `${apiUrl}/messages/cadmin/${cadminId}/toggle-status/${messageId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(`
                    Error ${response.status}: ${
                    errorInfo.message || response.statusText
                }`);
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error(error, "Error de la petición deleteMessageFromCAdmin");
    }
};

export const deleteMessageFromUser = async (
    userId: string,
    messageId: string,
    token: string
): Promise<IMessage[] | any> => {
    try {
        const response = await fetch(
            `${apiUrl}/messages/user/${userId}/toggle-status/${messageId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(`
                    Error ${response.status}: ${
                    errorInfo.message || response.statusText
                }`);
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error(error, "Error de la petición deleteMessageFromUser");
    }
};

export const deleteMessageFromUser = async (
    userId: string,
    messageId: string,
    token: string
): Promise<IMessage[] | any> => {
    try {
        const response = await fetch(
            `${apiUrl}/messages/user/${userId}/toggle-status/${messageId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(`
                    Error ${response.status}: ${errorInfo.message || response.statusText}`);
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error(error, 'Error de la petición deleteMessageFromUser');
    }
};
