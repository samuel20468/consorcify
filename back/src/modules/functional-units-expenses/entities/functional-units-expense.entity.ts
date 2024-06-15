import ColumnNumericTransformer from 'src/helpers/numeric-transformer.helper';
import { Expense } from 'src/modules/expenses/entities/expense.entity';
import { FunctionalUnit } from 'src/modules/functional-units/entities/functional-unit.entity';
import { Payment } from 'src/modules/payments/entities/payment.entity';
import { PAYMENT_STATUS } from 'src/utils/constants';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'functional_units_expenses',
})
export class FunctionalUnitExpense {
  /**
   * El ID de la expensa (UUID v4)
   * @example "75b4566f-ddc3-4b7c-93de-4f4d5840cc34"
   * */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * El monto del prorrateo de la expensa general
   * @example 1000.50
   */
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  monthly_expenditure: number;

  /**
   * El monto del estado de cuenta (balance) de la Unidad Funcional al momento de generar la Expensa
   * @example 1000.50
   */
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  previous_balance: number;

  /**
   * El monto de los intereses de la Unidad Funcional por mora
   * @example 1000.50
   */
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  interests: number;

  /**
   * El monto de la expensa mensual de la Unidad Funcional
   * @example 1000.50
   */
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  total_amount: number;

  /**
   * El estado del pago de la expensa. Default: "impago"
   * @example "pagado"
   */
  @Column('enum', { enum: PAYMENT_STATUS, default: PAYMENT_STATUS.UNPAID })
  payment_status: PAYMENT_STATUS;

  /**
   * Fecha de creacion de la expensa por la Unidad Funcional
   * @example "2024-07-12T00:00:00.000Z"
   * */
  @Column({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(
    () => FunctionalUnit,
    (functionalUnit) => functionalUnit.functional_units_expenses,
  )
  @JoinColumn({ name: 'functional_unit_id' })
  functional_unit: FunctionalUnit;

  @ManyToOne(() => Expense, (expense) => expense.functional_units_expenses)
  @JoinColumn({ name: 'expense_id' })
  expense: Expense;

  @OneToMany(() => Payment, (payment) => payment.functional_unit_expense)
  payments: Payment[];
}
