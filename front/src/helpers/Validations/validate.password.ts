export const validatePwd = (fieldName: string, password: string) => {
    const reGexPwd = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    const errors = {
        [fieldName]: '',
    };

    if (!reGexPwd.test(password)) {
        errors[fieldName] =
            'Mínimo 8 caracteres, al menos una mayúcula y un numero';
    } else {
        errors[fieldName] = '';
    }

    return errors;
};
