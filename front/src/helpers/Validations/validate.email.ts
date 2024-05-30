export const validateEmail = (email: string) => {
    const reGexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errors = {
        email: "",
    };

    if (!reGexEmail.test(email)) {
        errors.email = "Dirección de correo invalida.";
    }

    return errors;
};
