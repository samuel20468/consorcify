export const validateNombre = (field: string, nombre: string) => {
    const reGexNombres = /^[A-Za-z\u00C0-\u017F\s]+$/;
    const errors = {
        [field]: '',
    };

    if (!reGexNombres.test(nombre)) {
        errors[field] = 'El nombre debe contener solo letras y espacios';
    } else {
        errors[field] = '';
    }

    return errors;
};
