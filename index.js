function laCajaDePandora(numero) {
    if (numero % 2 === 0) {
        return convertirABinario(numero);
    } else {
        return convertirAHexadecimal(numero);
    }

    
}

function convertirABinario(numero) {
    if (numero === 0) {
        return "0";
    }
    let binario = "";
    while (numero > 0) {
        binario = (numero % 2) + binario;
        numero = Math.floor(numero / 2);
    }
    return binario;
}

function convertirAHexadecimal(numero) {
    return numero.toString(16);
}

function JuanMolina (){
    return {
        nombre:"Juan Ignacio Molina",
        edad: 34,
        nacionalidad:"Argentina"
    }
}