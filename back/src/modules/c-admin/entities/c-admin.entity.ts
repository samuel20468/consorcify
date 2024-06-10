import { Consortium } from 'src/modules/consortiums/entities/consortium.entity';
import { SAT } from 'src/utils/constants';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'consortium_admins',
})
export class CAdmin {
  /**
   * El id del Administrador (UUID v4)
   * @example "95f5678a-df34-4d89-9c6f-3f9c8f9a2b19"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * El nombre del Administrador
   * @example "Juan Perez"
   */
  @Column({ length: 50 })
  name: string;

  /**
   * El correo electrónico del Administrador (único)
   * @example "juan.perez@example.com"
   */
  @Column({ length: 50, unique: true })
  email: string;

  /**
   * La contraseña del Administrador
   * @example "hashedpassword"
   */
  @Column({ type: 'char', length: 60 })
  password: string;

  /**
   * El número de teléfono del Administrador
   * @example "+5491134567890"
   */
  @Column({ length: 25 })
  phone_number: string;

  /**
   * El CUIT del Administrador (único)
   * @example "20304567891"
   */
  @Column({ type: 'char', length: 11, unique: true })
  cuit: string;

  /**
   * La dirección del Administrador
   * @example "Av. Siempre Viva 123"
   */
  @Column()
  address: string;

  /**
   * El estado SAT del Administrador
   * @example "Monotributo"
   */
  @Column('enum', { enum: SAT })
  sat: SAT;

  /**
   * El RPA del Administrador (único)
   * @example "12345"
   */
  @Column({ type: 'char', length: 5, unique: true })
  rpa: string;

  /**
   * El link a la imagen del Usuario
   * @example "http://imagenDeSilueta.com"
   */
  @Column({
    default:
      'https://res.cloudinary.com/consorcify/image/upload/v1717986798/xhieldioaw4r59gfxqmp.jpg',
  })
  picture: string;

  /**
   * Indica si el Administrador está activo
   * @example true
   */
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => Consortium, (consortium) => consortium.c_admin)
  consortiums: Consortium[];
}
