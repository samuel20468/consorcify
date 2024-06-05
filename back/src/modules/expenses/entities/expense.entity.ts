import ColumnNumericTransformer from 'src/helpers/numeric-transformer.helper';
import { Consortium } from 'src/modules/consortiums/entities/consortium.entity';
import { FINANCIAL_STATUS } from 'src/utils/constants';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'expenses',
})
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  issue_date: Date;

  @Column('date')
  expiration_date: Date;

  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  total_amount: number;

  @Column('enum', { enum: FINANCIAL_STATUS })
  status: FINANCIAL_STATUS;

  @ManyToOne(() => Consortium, (consortium) => consortium.expenses)
  @JoinColumn({ name: 'consortium_id' })
  consortium: Consortium;
}
