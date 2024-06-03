export const validatePwd = (password: string) => {
    const reGexPwd = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    const errors = {
        password: "",
    };

    if (!reGexPwd.test(password)) {
        errors.password =
            "La contraseña debe contener 8 caracteres, al menos una mayúcula y un numero";
    } else {
        errors.password = "";
    }

    return errors;
};
