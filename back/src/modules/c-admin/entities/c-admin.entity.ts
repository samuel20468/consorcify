import { Consortium } from 'src/modules/consortiums/entities/consortium.entity';
import { SAT } from 'src/utils/constants';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'consortium_admins',
})
export class CAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
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

  @OneToMany(() => Consortium, (consortium) => consortium.c_admin)
  consortiums: Consortium[];
}
