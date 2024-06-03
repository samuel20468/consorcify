import { Consortium } from 'src/modules/consortiums/entities/consortium.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { FUNCTIONAL_UNIT_TYPE } from 'src/utils/constants';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'functional_units',
})
export class FunctionalUnit {
  /**
   * El id de la Unidad Funcional (UUID v4)
   * @example "5e4d5f8b-2e6d-4f49-9b3e-8d6c6f7e8a5b"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * El tipo de la Unidad Funcional
   * @example "Apartmento"
   */
  @Column({ type: 'enum', enum: FUNCTIONAL_UNIT_TYPE })
  type: FUNCTIONAL_UNIT_TYPE;

  /**
   * La ubicación de la Unidad Funcional
   * @example "Piso 1, Departamento A"
   */
  @Column({ length: 50, nullable: false })
  location: string;

  /**
   * El número de la Unidad Funcional
   * @example "1A"
   */
  @Column({ length: 20, nullable: false })
  number: string;

  /**
   * El propietario de la Unidad Funcional
   * @example "Maria Lopez"
   */
  @Column({ length: 50, nullable: false })
  owner: string;

  /**
   * El número de teléfono del propietario de la Unidad Funcional
   * @example "+5491145678901"
   */
  @Column({ length: 20, nullable: false })
  owner_phone_number: string;

  /**
   * El correo electrónico del propietario de la Unidad Funcional
   * @example "maria.lopez@example.com"
   */
  @Column({ length: 50, nullable: false })
  owner_email: string;

  /**
   * El saldo de la Unidad Funcional
   * @example "1500.50"
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  balance: number;

  /**
   * El código de la Unidad Funcional (único)
   * @example "UF123456"
   */
  @Column({ length: 8, nullable: false, unique: true })
  code: string;

  /**
   * Indica si la Unidad Funcional está activa
   * @example true
   */
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Consortium, (consortium) => consortium.functional_units)
  @JoinColumn({ name: 'consortium_id' })
  consortium: Consortium;

  @ManyToOne(() => User, (user) => user.functional_units)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
