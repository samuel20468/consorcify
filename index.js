function laCajaDePandora(numero) {
    if (Number.isInteger(numero)) {
        if (numero % 2 === 0) {
            const binario = numero.toString(2);
            return binario;
        } else {
            const hexadecimal = numero.toString(16);
            return hexadecimal;
        }
    }
    return 'El número ingresado no es un número entero';
}

function adrianaCuellar() {
    const adriana = {
        nombre: 'Adriana Cuellar',
        edad: '30',
        nacionalidad: 'venezolana',
    };
    return adriana;
}
