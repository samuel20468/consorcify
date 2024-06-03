export const validateNombre = (nombre: string) => {
    const reGeNombres = /^[A-Za-z\u00C0-\u017F\s]+$/;
    const errors = {
        name: "",
    };

    if (!reGeNombres.test(nombre)) {
        errors.name = "El nombre debe contener solo letras y espacios";
    } else {
        errors.name = "";
    }

    return errors;
};
