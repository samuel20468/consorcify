import { FunctionalUnitExpense } from 'src/modules/functional-units-expenses/entities/functional-units-expense.entity';
import { PAYMENT_STATUS } from 'src/utils/constants';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'payments',
})
export class Payment {
  //Pendiente agregar o quitar campos, dependiendo de lo que devuelva el objeto de stripe
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  amount: number;

  @Column('date')
  payment_date: Date;

  @Column()
  payment_method: string;

  @Column('enum', { enum: PAYMENT_STATUS })
  payment_status: PAYMENT_STATUS;

  @ManyToOne(
    () => FunctionalUnitExpense,
    (functionalUnitExpense) => functionalUnitExpense.payments,
  )
  @JoinColumn({
    name: 'functional_unit_expense_id',
  })
  functional_unit_expense: FunctionalUnitExpense;
}
