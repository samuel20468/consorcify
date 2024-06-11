import ColumnNumericTransformer from 'src/helpers/numeric-transformer.helper';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Consortium } from 'src/modules/consortiums/entities/consortium.entity';
import { Expenditure } from 'src/modules/expenditures/entities/expenditure.entity';

@Entity({
  name: 'suppliers',
})
export class Supplier {
  /**
   * El id del Proveedor (UUID v4)
   * @example "b2d3f5a6-7e4a-4b8e-bf2a-2e5b3c9f8d1b"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * El nombre del Proveedor
   * @example "Limpiezas SRL"
   */
  @Column({ length: 50})
  name: string;

  /**
   * El CUIT del Proveedor
   * @example "30567891234"
   */
  @Column({ type: 'char', length: 11})
  cuit: string;

  /**
   * El correo electrónico del Proveedor
   * @example "contacto@limpiezassrl.com"
   */
  @Column({ length: 50 })
  email: string;

  /**
   * El número de teléfono del Proveedor
   * @example "+5491145678901"
   */
  @Column({ length: 25 })
  phone_number: string;

  /**
   * La dirección del Proveedor
   * @example "Av. Siempre Viva 123"
   */
  @Column()
  address: string;

  /**
   * El saldo del Consorcio con el Proveedor
   * @example "-2000.00"
   */
  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  balance: number;

  /**
   * Indica si el Proveedor está activo
   * @example true
   */
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Consortium, (consortium) => consortium.suppliers)
  @JoinColumn({ name: 'consortium_id' })
  consortium: Consortium;

   /**
   * Los gastos del consorcio
   * @example "1000.50"
   */
   @OneToMany(() => Expenditure, (expenditure) => expenditure.supplier)
   expenditures: Expenditure[];
}
