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
