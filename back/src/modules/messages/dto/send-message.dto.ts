import { IsUUID, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { SUBJECT_MESSAGE } from 'src/utils/constants';

export class SendMessageDto {
  /**
   * El ID del usuario que envía el mensaje
   * @example "d290f1ee-6c54-4b01-90e6-d701748f0851"
   */
  @IsNotEmpty({
    message: 'El id del usuario que envía el mensaje es requerido',
  })
  @IsUUID()
  @IsString({
    message:
      'El id del usuario que envía el mensaje debe ser un valor alfanumérico',
  })
  user_id: string;

  /**
   * El ID de la unidad funcional a la cual está asociado el usuario, y sobre la cual hace referencia el mensaje
   * @example "f1a3e8d3-7752-4f0a-8e2a-9b3c7e5d2e4a"
   */
  @IsNotEmpty({
    message:
      'El id del consorcio donde el usuario tiene la unidad funcional es requerido',
  })
  @IsUUID()
  @IsString({
    message: 'El id del consorcio debe ser un valor alfanumérico',
  })
  functional_unit_id: string;

  /**
   * El asunto del mensaje
   * @example "Reclamo"
   */
  @IsNotEmpty({ message: 'El asunto del mensaje es requerido' })
  @IsEnum(SUBJECT_MESSAGE, {
    message: 'El Asunto del mensaje debe ser un valor válido',
  })
  subject: SUBJECT_MESSAGE;

  /**
   * El contenido del mensaje
   * @example "Este es el contenido del mensaje"
   */
  @IsNotEmpty({ message: 'El contenido del mensaje es requerido' })
  @IsString({
    message: 'El contenido del mensaje debe ser un valor alfanúmerico',
  })
  content: string;
}
