import { INewExpense } from "@/Interfaces/expenses.interfaces";

export const validateForm = (expense: INewExpense): INewExpense => {
    const errors: INewExpense = {
        name: "",
        issue_date: "",
        expiration_date: "",
        consortium_id: "",
    };

    // Validar la fecha de vencimiento
    if (expense.expiration_date === "") {
        errors.expiration_date = "Debe seleccionar una fecha de vencimiento.";
    }

    // Puedes agregar más lógica de validación aquí según tus necesidades

    return errors;
};
