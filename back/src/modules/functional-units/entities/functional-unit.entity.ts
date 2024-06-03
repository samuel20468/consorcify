import { Consortium } from 'src/modules/consortiums/entities/consortium.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { FUNCTIONAL_UNIT_TYPE } from 'src/utils/constants';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

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

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  balance: number;

  @Column({ length: 8, nullable: false, unique: true })
  code: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Consortium, (consortium) => consortium.functional_units)
  @JoinColumn({ name: 'consortium_id' })
  consortium: Consortium;

  @ManyToOne(() => User, (user) => user.functional_units)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
