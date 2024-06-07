import { error } from "console";

export function formatearNumero(numero: string) {
    // Eliminar todos los caracteres que no sean dígitos
    const numerosSolo = numero.replace(/\D/g, "");
    const partes = numerosSolo.match(/^(\d{2})(\d{8})(\d{1})$/);
    if (partes) {
        return partes.slice(1).join("-");
    } else {
        return numero;
    }
}

export const validateInterestRate = (value: string): string | null => {
    const regex = /^\d{0,2}(\.\d{0,2})?$/;
    const errors = {
        interest_rate: "",
    };
    if (regex.test(value)) {
        return (errors.interest_rate = ""); // El valor es válido
    } else {
        return (errors.interest_rate =
            "El valor debe ser un número con hasta dos decimales"); // El valor no es válido
    }
};
