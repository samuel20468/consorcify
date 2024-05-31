import { FunctionalUnit } from 'src/modules/functional-units/entities/functional-unit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 80, nullable: false })
  first_name: string;

  @Column({ length: 80, nullable: false })
  last_name: string;

  @Column({ length: 320, unique: true, nullable: false })
  email: string;

  @Column({ length: 72, nullable: false })
  password: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  is_super_admin: boolean;

  @OneToMany(() => FunctionalUnit, (funcionalUnit) => funcionalUnit.user)
  functional_units: FunctionalUnit[];
}
