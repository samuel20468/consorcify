import { FUNCTIONAL_UNIT_TYPE } from 'src/utils/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'functional_units',
})
export class FunctionalUnit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: FUNCTIONAL_UNIT_TYPE })
  type: FUNCTIONAL_UNIT_TYPE;

  @Column({ length: 50, nullable: false })
  location: string;

  @Column({ length: 20, nullable: false })
  number: string;

  @Column({ length: 50, nullable: false })
  owner: string;

  @Column({ length: 20, nullable: false })
  owner_phone_number: string;

  @Column({ length: 50, nullable: false })
  owner_email: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 }) // Pendiente definir como se manejara el formato de número
  balance: number;

  //@ManyToOne(() => Consorcium, (consorcium) => consorcium.functionalUnits)
  //@JoinColumn({ name: 'consorcium_id' })
  //consorcium: Consorcium;
}
