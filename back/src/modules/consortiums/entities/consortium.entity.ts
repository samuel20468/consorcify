import ColumnNumericTransformer from 'src/helpers/numeric-transformer.helper';
import { CAdmin } from 'src/modules/c-admin/entities/c-admin.entity';
import { Expense } from 'src/modules/expenses/entities/expense.entity';
import { FunctionalUnit } from 'src/modules/functional-units/entities/functional-unit.entity';
import { Message } from 'src/modules/messages/entities/message.entity';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'consortiums',
})
export class Consortium {
  /**
   * El id del Consorcio (UUID v4)
   * @example "75b4566f-ddc3-4b7c-93de-4f4d5840cc34"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * La clave SUTERH del Consorcio
   * @example "12345/01"
   */
  @Column({ type: 'varchar', length: 20, nullable: true })
  suterh_key: string;

  /**
   * La Razon Social del Consorcio
   * @example "Consorcio Palacio Barolo"
   */
  @Column({ type: 'varchar', length: 50 })
  name: string;

  /**
   * El CUIT del Consorcio (único)
   * @example "30030345670"
   */
  @Column({ type: 'char', length: 11, unique: true })
  cuit: string;

  /**
   * La calle del domicilio del Consorcio
   * @example "Av. de Mayo"
   */
  @Column({ type: 'varchar', length: 30 })
  street_name: string;

  /**
   * El número del domicilio del Consorcio
   * @example "1370"
   */
  @Column({ type: 'integer' })
  building_number: number;

  /**
   * El código postal del Consorcio
   * @example "C1085"
   */
  @Column({ type: 'varchar', length: 10 })
  zip_code: string;

  /**
   * El país del Consorcio
   * @example "Argentina"
   */
  @Column({ type: 'varchar', length: 50 })
  country: string;

  /**
   * La provincia del Consorcio
   * @example "CABA"
   */
  @Column({ type: 'varchar', length: 50 })
  province: string;

  /**
   * La localidad del Consorcio
   * @example "CABA"
   */
  @Column({ type: 'varchar', length: 50 })
  city: string;

  /**
   * La cantidad de pisos del Consorcio
   * @example "22"
   */
  @Column({ type: 'integer' })
  floors: number;

  /**
   * La cantidad de unidades funcionales del Consorcio
   * @example "22"
   */
  @Column({ type: 'integer' })
  ufs: number;

  /**
   * La categoría del Consorcio
   * @example "1"
   */
  @Column({ type: 'integer' })
  category: number;

  /**
   * El día del 1er vencimiento de expensas del Consorcio
   * @example "10"
   */
  @Column({ type: 'integer' })
  first_due_day: number;

  /**
   * El link a la imagen del Usuario
   * @example "https://upload.wikimedia.org/wikipedia/commons/0/07/Palacio_Barolo.JPG"
   */
  @Column({
    default:
      'https://res.cloudinary.com/consorcify/image/upload/v1717987060/hiluk0b3nz4kkz0k33uc.jpg',
  })
  picture: string;

  /**
   * La tasa de interes de las expensas atrasadas
   * @example 10
   */
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  interest_rate: number;

  @Column({ type: 'double precision', default: -34.6701584 })
  latitude: number;

  @Column({ type: 'double precision', default: -58.3713336 })
  longitude: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => CAdmin, (cAdmin) => cAdmin.consortiums)
  @JoinColumn({ name: 'c_admin_id' })
  c_admin: CAdmin;

  @OneToMany(
    () => FunctionalUnit,
    (functionalUnit) => functionalUnit.consortium,
  )
  functional_units: FunctionalUnit[];

  @OneToMany(() => Expense, (expense) => expense.consortium)
  expenses: Expense[];

  @OneToMany(() => Supplier, (supplier) => supplier.consortium)
  suppliers: Supplier[];

  @OneToMany(() => Message, (message) => message.consortium)
  messages: Message[];
}
