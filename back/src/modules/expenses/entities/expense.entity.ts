import ColumnNumericTransformer from 'src/helpers/numeric-transformer.helper';
import { Consortium } from 'src/modules/consortiums/entities/consortium.entity';
import { Expenditure } from 'src/modules/expenditures/entities/expenditure.entity';
import { FunctionalUnitExpense } from 'src/modules/functional-units-expenses/entities/functional-units-expense.entity';
import { EXPENSE_STATUS } from 'src/utils/constants';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
    default: 0,
  })
  total_amount: number;

  /**
   * El estado de la expensa
   * @example "Abierta"
   */
  @Column('enum', { enum: EXPENSE_STATUS, default: EXPENSE_STATUS.OPEN })
  status: EXPENSE_STATUS;

  /**
   * Indica si la expensa está activa
   * @example true
   */
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Consortium, (consortium) => consortium.expenses)
  @JoinColumn({ name: 'consortium_id' })
  consortium: Consortium;

  @OneToMany(() => Expenditure, (expenditure) => expenditure.expense)
  expenditures: Expenditure[];

  @OneToMany(() => FunctionalUnitExpense, (functionalUnitsExpense) => functionalUnitsExpense.expense)
  functional_units_expenses: FunctionalUnitExpense[];
}
