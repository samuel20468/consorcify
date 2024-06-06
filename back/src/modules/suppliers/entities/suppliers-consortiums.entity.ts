import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import ColumnNumericTransformer from 'src/helpers/numeric-transformer.helper';
import { Supplier } from './supplier.entity';
import { Consortium } from 'src/modules/consortiums/entities/consortium.entity';

@Entity({
  name: 'suppliers_consortiums',
})
export class SupplierConsortium {
  /**
   * El ID del proveedor
   * @example "75b4566f-ddc3-4b7c-93de-4f4d5840cc34"
   */
  @PrimaryColumn('uuid')
  supplier_id: string;

  /**
   * El ID del consorcio
   * @example "75b4566f-ddc3-4b7c-93de-4f4d5840cc34"
   */
  @PrimaryColumn('uuid')
  consortium_id: string;

  /**
   * El saldo del proveedor para este consorcio
   * @example 1000.50
   */
  @Column('numeric', {
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  balance: number;

  /**
   * El proveedor asociado
   * @example "Proveedor XYZ"
   */
  @ManyToOne(() => Supplier, (supplier) => supplier.suppliers_consortiums)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  /**
   * El consorcio asociado
   * @example "Consorcio ABC"
   */
  @ManyToOne(() => Consortium, (consortium) => consortium.suppliers_consortiums)
  @JoinColumn({ name: 'consortium_id' })
  consortium: Consortium;
}
