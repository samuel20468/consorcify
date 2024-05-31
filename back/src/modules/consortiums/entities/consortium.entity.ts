import { CAdmin } from 'src/modules/c-admin/entities/c-admin.entity';
import { FunctionalUnit } from 'src/modules/functional-units/entities/functional-unit.entity';
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
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  suterh_key: string;

  /**
   * La Razon Social del Consorcio
   * @example "Consorcio Edificio Rivadavia 456"
   */
  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  /**
   * El CUIT del Consorcio (único)
   * @example "30030345670"
   */
  @Column({
    type: 'char',
    length: 11,
    unique: true,
  })
  cuit: string;

  /**
   * La calle del domicilio del Consorcio
   * @example "Av. Rivadavia"
   */
  @Column({
    type: 'varchar',
    length: 30,
  })
  street_name: string;

  /**
   * El número del domicilio del Consorcio
   * @example "456"
   */
  @Column({
    type: 'integer',
  })
  building_number: number;

  /**
   * El código postal del Consorcio
   * @example "C1002AAP"
   */
  @Column({
    type: 'varchar',
    length: 10,
  })
  zip_code: string;

  /**
   * El país del Consorcio
   * @example "Argentina"
   */
  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  /**
   * La provincia del Consorcio
   * @example "CABA"
   */
  @Column({
    type: 'varchar',
    length: 50,
  })
  province: string;

  /**
   * La localidad del Consorcio
   * @example "CABA"
   */
  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  /**
   * La cantidad de pisos del Consorcio
   * @example "5"
   */
  @Column({
    type: 'integer',
  })
  floors: number;

  /**
   * La cantidad de unidades funcionales del Consorcio
   * @example "17"
   */
  @Column({
    type: 'integer',
  })
  ufs: number;

  /**
   * La categoría del Consorcio
   * @example "1"
   */
  @Column({
    type: 'integer',
  })
  category: number;

  /**
   * El día del 1er vencimiento de expensas del Consorcio
   * @example "10"
   */
  @Column({
    type: 'integer',
  })
  first_due_day: number;

  @ManyToOne(() => CAdmin, (cAdmin) => cAdmin.consortiums)
  @JoinColumn({ name: 'c_admin_id' })
  cAdmin: CAdmin;

  @OneToMany(
    () => FunctionalUnit,
    (functionalUnit) => functionalUnit.consortium,
  )
  functional_units: FunctionalUnit[];

  // @OneToMany(() => Supplier, (supplier) => supplier.consortium)
  // suppliers: Supplier[];
}