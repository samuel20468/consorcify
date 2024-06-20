export const validateIssue = (issue_date: string, expiration_date: string) => {
    const errors = {
        issue_date: '',
        expiration_date: '',
    };
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    const maxDate = new Date(firstDayOfMonth);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(0);
    const issueDate = new Date(issue_date);

    if (!issue_date) {
        errors.issue_date = 'La fecha es requerida';
    } else {
        const firstDayOfMonthForIssue = new Date();
        firstDayOfMonthForIssue.setDate(0);
        if (issueDate < firstDayOfMonthForIssue) {
            errors.issue_date =
                'No puede iniciar una expensa con fecha del mes anterior';
        } else if (issueDate > maxDate) {
            errors.issue_date =
                'El límite de inicio establecido es el próximo mes.';
        }
    }

    if (!expiration_date) {
        errors.expiration_date = 'La fecha es requerida';
    } else {
        const selectedDate = new Date(expiration_date);
        if (selectedDate < issueDate) {
            errors.expiration_date =
                'No puedes cerrar una expensa con fecha anterior a su inicio';
        } else if (selectedDate >= maxDate) {
            errors.expiration_date =
                'El límite de cierre establecido es el próximo mes.';
        } else if (selectedDate === issueDate) {
            errors.expiration_date =
                'No puedes cerrar una expensa el mismo día de su inicio';
        }
    }

    return errors;
};
