export const validateInvoiceNumber = (invoice_number: string) => {
    const reGexInvoiceNumber = /^\d{12}$/;
    const errors = {
        invoice_number: "",
    };

    if (!reGexInvoiceNumber.test(invoice_number)) {
        errors.invoice_number = "La factura debe contener 12 números.";
    }

    return errors;
};
