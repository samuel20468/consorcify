export const validateCuit = (cuit: string) => {
    const reGexCuit = /^\d{11}$/;
    const errors = {
        cuit: "",
    };

    if (!reGexCuit.test(cuit)) {
        errors.cuit = "El debe contener solo 11 números";
    }

    return errors;
};
