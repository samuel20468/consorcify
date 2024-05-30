import { CADMIN_PASS, SAT } from 'src/utils/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'consortium_admins',
})
export class CAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ type: 'char', length: 60 })
  password: string;

  @Column({ length: 25 })
  phone_number: string;

  @Column({ type: 'char', length: 11, unique: true })
  cuit: string;

  @Column()
  address: string;

  @Column('enum', { enum: SAT })
  sat: SAT;

  @Column({ type: 'char', length: 5, unique: true })
  rpa: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Relación con Consortium 1:N
  //   @OneToMany(() => Consortium, consortium => consortium.cAdmin)
  //   consortium: Consortium[];
}
