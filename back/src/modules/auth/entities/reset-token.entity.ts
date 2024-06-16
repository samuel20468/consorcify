import { CAdmin } from 'src/modules/c-admin/entities/c-admin.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'pass_reset_tokens',
})
export class PassResetTokens {
  /**
   * El id del Reset-token (UUID v4)
   * @example "d3f9a1b2-4b8e-4b8f-b3e6-2e5c3f9f8d7c"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * El Token generado para resetear la contraseña
   * @example "token123"
   */
  @Column({ unique: true })
  token: string;

  /**
   * Indica si el token está activo o no.
   * @example true
   */
  @Column({ default: true })
  active: boolean;

  /**
   * Fecha exacta en que se crea el token
   * @example "2024-06-13T12:30:45.000Z"
   */
  @CreateDateColumn()
  created_at: Date;

  /**
   * Fecha exacta en la que expira el token
   * @example "2024-06-13T12:45:45.000Z"
   */
  @Column()
  expires_at: Date;

  /**
   * Usuario al que está asociado este token de restablecimiento de contraseña
   */
  @ManyToOne(() => User, (user) => user.pass_reset_tokens)
  @JoinColumn({ name: 'user_id' })
  user: User;

  /**
   * Administrador al que está asociado este token de restablecimiento de contraseña
   */
  @ManyToOne(() => CAdmin, (c_admin) => c_admin.pass_reset_tokens)
  @JoinColumn({ name: 'c_admin_id' })
  c_admin: CAdmin;
}
