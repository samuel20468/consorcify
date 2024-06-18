import { IDataReset } from '@/Interfaces/reset-pass.interfaces';
import { apiUrl } from './fetch.helper.admin';

export const resetPassFetch = async (dataReset: IDataReset) => {
    try {
        const response = await fetch(`${apiUrl}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataReset),
        });
        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(
                    `Error ${response.status}: ${
                        errorInfo.message || response.statusText
                    }`
                );
            });
        } else {
            return response;
        }
    } catch (error) {
        console.error('El error está en el resetPassFetch', error);
    }
};
