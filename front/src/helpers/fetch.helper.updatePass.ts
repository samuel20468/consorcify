import { apiUrl } from './fetch.helper.admin';
import { IUpdatePass } from '@/Interfaces/updatePass.interface';

export const updatePassFetch = async (
    updatePass: IUpdatePass,
    keyEntity: string,
    id: string,
    token: string
) => {
    let entity;
    if (keyEntity === 'user') {
        entity = 'users';
    } else if (keyEntity === 'cadmin') {
        entity = 'c-admins';
    }
    try {
        const response = await fetch(
            `${apiUrl}/${entity}/update-password/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatePass),
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
        } else {
            return response;
        }
    } catch (error) {
        console.error('El error está en el updatePassFetch', error);
    }
};
