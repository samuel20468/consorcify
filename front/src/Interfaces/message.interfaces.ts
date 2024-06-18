export interface IMessage {
    id: string;
    sender: string;
    receiver: string;
    functional_unit: string;
    consortium: string;
    consortiumId: string;
    subject: SUBJECT_MESSAGE;
    content: string;
    timestamp: string;
    is_read?: boolean;
}

export enum SUBJECT_MESSAGE {
    COMPLAINT = 'Reclamo',
    INQUIRY = 'Consulta',
    SUGGESTION = 'Sugerencia',
    MAINTENANCE_REQUEST = 'Solicitud de Mantenimiento',
}
