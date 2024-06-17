import { getUserById } from "./fetch.helper.user";

export const haveFunctionalUnit = async (id: string, token: string) => {
    console.log(id, token);

    try {
        const response = await getUserById(id, token);
        if (response.ok) {
            const data = await response.json();
            if (data?.functional_unit.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.log(error);
    }
};
