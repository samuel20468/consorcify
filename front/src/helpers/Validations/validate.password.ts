export const validatePwd = (password: string) => {
    const reGexPwd = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    const errors = {
        password: "",
    };

    if (!reGexPwd.test(password)) {
        errors.password =
            "La contraseña debe ser de 8 caractener y debe contener al menos una mayúscula y un numero";
    }

    return errors;
};
