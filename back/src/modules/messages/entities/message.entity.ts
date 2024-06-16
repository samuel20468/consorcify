import { CAdmin } from 'src/modules/c-admin/entities/c-admin.entity';
import { Consortium } from 'src/modules/consortiums/entities/consortium.entity';
import { FunctionalUnit } from 'src/modules/functional-units/entities/functional-unit.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { SUBJECT_MESSAGE } from 'src/utils/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'messages',
})
export class Message {
  /**
   * El id del mensaje (UUID v4)
   * @example "5e4d5f8b-2e6d-4f49-9b3e-8d6c6f7e8a5b"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * El usuario que envía el mensaje
   * @type {User}
   */
  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'sender_user_id' })
  sender: User;

  /**
   * El administrador del consorcio que recibe el mensaje
   * @type {CAdmin}
   */
  @ManyToOne(() => CAdmin, (cadmin) => cadmin.messages)
  @JoinColumn({ name: 'reciver_c_admin_id' })
  receiver: CAdmin;

  /**
   * La unidad funcional a la que refiere el mensaje
   * @type {Consortium}
   */
  @ManyToOne(() => FunctionalUnit, (functionalUnit) => functionalUnit.messages)
  @JoinColumn({ name: 'functional_unit_id' })
  functional_unit: FunctionalUnit;

  /**
   * El consorcio al que pertenece la unidad funcional
   * @type {Consortium}
   */
  @ManyToOne(() => Consortium, (consortium) => consortium.messages)
  @JoinColumn({ name: 'consortium_id' })
  consortium: Consortium;

  /**
   * El asunto del mensaje
   * @example "Reclamo"
   */
  @Column({ type: 'enum', enum: SUBJECT_MESSAGE })
  subject: SUBJECT_MESSAGE;

  /**
   * El contenido del mensaje
   * @example "Este es el contenido del mensaje"
   */
  @Column({ type: 'varchar', length: 500, nullable: false })
  content: string;

  /**
   * La fecha y hora en que se creó el mensaje
   * @example "2023-06-15T08:30:00.000Z"
   */
  @CreateDateColumn()
  timestamp: Date;

  /**
   * Indica si el mensaje ha sido leído
   * @example false
   */
  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  /**
   * Indica si el mensaje sigue visible para el usuario/remitente
   * @example true
   */
  @Column({ type: 'boolean', default: true })
  is_active_user: boolean;

  /**
   * Indica si el mensaje sigue visible para el administrador/receptor
   * @example false
   */
  @Column({ type: 'boolean', default: true })
  is_active_c_admin: boolean;
}
