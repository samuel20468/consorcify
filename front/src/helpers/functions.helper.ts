export function formatearNumero(numero: string | undefined) {
    if (!numero) {
        // Manejo del caso cuando `numero` es undefined
        return "Número no disponible";
    }

    // Eliminar todos los caracteres que no sean dígitos
    const numerosSolo = numero.replace(/\D/g, "");
    const partes = numerosSolo.match(/^(\d{2})(\d{8})(\d{1})$/);
    if (partes) {
        return partes.slice(1).join("-");
    }
    return numero; // Devuelve el número original si no coincide con el patrón esperado
}

export function formatMoney(amount: number | any): string {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    }).format(amount);
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

export const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month: number | string = now.getMonth() + 1;
    let day: number | string = now.getDate();

    // Ajuste para asegurar dos dígitos en el mes y el día
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }

    return `${year}-${month}-${day}`;
};

export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) {
        return ""; // O cualquier valor por defecto que quieras retornar en caso de fecha inválida
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return ""; // O cualquier valor por defecto en caso de que la fecha sea inválida
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

// Funcion para numeros de factura
export const formatFactura = (numberString: string): string => {
    // Verificar que la entrada tenga 12 caracteres
    if (numberString.length !== 12) {
        throw new Error("La cadena debe tener exactamente 12 caracteres.");
    }

    // Separar la cadena en dos partes
    const firstPart = numberString.slice(0, 4); // Los primeros 4 caracteres
    const secondPart = numberString.slice(4); // Los siguientes 8 caracteres

    // Combinar las partes con un guion medio
    const formattedNumber = `${firstPart}-${secondPart}`;

    return formattedNumber;
};
