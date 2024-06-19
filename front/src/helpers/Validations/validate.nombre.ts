export const validateNombreCompleto = (nombre: string, apellido: string) => {
    const reGeNombres = /^[A-Za-zÀ-ÿ\s]+$/;
    const errors = {
        first_name: '',
        last_name: '',
    };

    if (!reGeNombres.test(nombre)) {
        errors.first_name = 'El nombre debe contener solo letras y espacios';
    } else {
        errors.first_name = '';
    }
    if (!reGeNombres.test(apellido)) {
        errors.last_name = 'El apellido debe contener solo letras y espacios';
    } else {
        errors.last_name = '';
    }

    return errors;
};
