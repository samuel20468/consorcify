import ColumnNumericTransformer from 'src/helpers/numeric-transformer.helper';
import { Consortium } from 'src/modules/consortiums/entities/consortium.entity';
import { EXPENSE_STATUS } from 'src/utils/constants';
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
  /**
   * El ID de la expensa (UUID v4)
   * @example "75b4566f-ddc3-4b7c-93de-4f4d5840cc34"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * La fecha de emisión de la expensa
   * @example "2024-06-02"
   */
  @Column('date')
  issue_date: Date;

  /**
   * La fecha de vencimiento de la expensa
   * @example "2024-07-02"
   */
  @Column('date')
  expiration_date: Date;

  /**
   * El monto total de la expensa
   * @example 1000.50
   */
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  total_amount: number;

  /**
   * El estado financiero de la expensa
   * @example "Pendiente"
   */
  @Column('enum', { enum: EXPENSE_STATUS })
  status: EXPENSE_STATUS;

  @ManyToOne(() => Consortium, (consortium) => consortium.expenses)
  @JoinColumn({ name: 'consortium_id' })
  consortium: Consortium;
}
