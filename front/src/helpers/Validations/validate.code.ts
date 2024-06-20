export const validateCode = (code: string) => {
    const reGexCode = /^[a-zA-Z0-9]{8}$/;

    if (!reGexCode.test(code)) {
        return 'El código es de 8 caracteres, no admite espacios ni caracteres especiales';
    }
};
