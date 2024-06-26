export const validateNumbers = (
    dueDay: number,
    interest: number,
    category: number
) => {
    const errors = {
        first_due_day: '',
        interest_rate: '',
        category: '',
    };

    if (dueDay < 1 || dueDay > 31) {
        errors.first_due_day = 'Debe ingresar un día de calendario válido';
    }
    if (interest < 0 || interest > 99.99) {
        errors.interest_rate = 'El interés debe estar entre 0.00 y 99.99';
    }
    if (category < 1 || category > 4) {
        errors.category = 'La categoría puede ser únicamente 1, 2, 3, 4';
    }

    return errors;
};
