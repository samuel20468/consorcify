export const validateBalance = (value: string) => {
    const numRegEx = /^\d+$/;
    const errors = {
        balance: "",
    };

    if (!numRegEx.test(value)) {
        errors.balance = "Solo Ingrese numeros";
    } else {
        errors.balance = "";
    }

    return errors;
};
