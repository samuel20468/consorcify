import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
   * La Razon Social del Consorcio
   * @example "Consorcio Edificio Rivadavia 456"
   */
  @Column({
    type: 'varchar',
    length: 50,
  })
  razon_social: string;

  /**
   * El CUIT del Consorcio (único)
   * @example "30-03034567-0"
   */
  @Column({
    type: 'varchar',
    length: 13,
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
  calle: string;

  /**
   * El número del domicilio del Consorcio
   * @example "456"
   */
  @Column({
    type: 'integer',
  })
  numero: number;

  /**
   * El código postal del Consorcio
   * @example "C1002AAP"
   */
  @Column({
    type: 'varchar',
    length: 10,
  })
  codigo_postal: string;

  /**
   * El país del Consorcio
   * @example "Argentina"
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  country: string;

  /**
   * La provincia del Consorcio
   * @example "CABA"
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  province: string;

  /**
   * La localidad del Consorcio
   * @example "CABA"
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
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
    type: 'varchar',
    length: 2,
  })
  first_due_date: string;
}
