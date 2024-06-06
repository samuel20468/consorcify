import { FunctionalUnit } from 'src/modules/functional-units/entities/functional-unit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  /**
   * El id del Usuario (UUID v4)
   * @example "d3f9a1b2-4b8e-4b8f-b3e6-2e5c3f9f8d7c"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * El nombre del Usuario
   * @example "Juan"
   */
  @Column({ length: 80, nullable: false })
  first_name: string;

  /**
   * El apellido del Usuario
   * @example "Perez"
   */
  @Column({ length: 80, nullable: false })
  last_name: string;

  /**
   * El correo electrónico del Usuario (único)
   * @example "juan.perez@example.com"
   */
  @Column({ length: 320, unique: true, nullable: false })
  email: string;

  /**
   * La contraseña del Usuario
   * @example "hashedpassword"
   */
  @Column({ length: 72, nullable: false })
  password: string;

  /**
   * El link a la imagen del Usuario
   * @example "http://imagenDeSilueta.com"
   */
  @Column({ default: "http://imagenDeSilueta.com" })
  picture: string;

  /**
   * Indica si el Usuario está activo
   * @example true
   */
  @Column({ default: false })
  active: boolean;

  /**
   * Indica si el Usuario se registro a traves de Auth0
   * @example true
   */
  @Column({ default: false })
  auth0: boolean;

  /**
   * Indica si el Usuario es super administrador
   * @example false
   */
  @Column({ default: false })
  is_super_admin: boolean;

  @OneToMany(() => FunctionalUnit, (functionalUnit) => functionalUnit.user)
  functional_units: FunctionalUnit[];
}
