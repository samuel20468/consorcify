export const validatePhoneNumber = (phone_number: string) => {
    const reGexPhone = /^\+\d{12}$/;
    const errors = {
        phone_number: '',
    };

    if (!reGexPhone.test(phone_number)) {
        errors.phone_number =
            'El formato debe comenzar con + seguido del código y número de teléfono';
    }

    return errors;
};
