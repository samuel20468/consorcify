export const validateSuterh = (suterh_key: string) => {
    const reGexSuterh = /^\d{5}\/\d{2}$/;
    const errors = {
        suterh_key: "",
    };

    if (!reGexSuterh.test(suterh_key)) {
        errors.suterh_key = "El formato de la clave ingresada no es válida";
    }

    return errors;
};
