export const validateRPA = (rpa: string) => {
    const reGexRPA = /^\d{5}$/;
    const errors = {
        rpa: "",
    };

    if (!reGexRPA.test(rpa)) {
        errors.rpa = "El RPA contener solo 5 números";
    }

    return errors;
};
