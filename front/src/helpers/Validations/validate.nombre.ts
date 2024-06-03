export const validateNombreCompleto = (nombre: string, apellido: string) => {
    const reGeNombres = /^[A-Za-z\s]+$/;
    const errors = {
        name: "",
        lastName: "",
    };

    if (!reGeNombres.test(nombre)) {
        errors.name = "El nombre debe contener solo letras y espacios";
    } else {
        errors.name = "";
    }
    if (!reGeNombres.test(apellido)) {
        errors.lastName = "El apellido debe contener solo letras y espacios";
    } else {
        errors.lastName = "";
    }

    return errors;
};
