import { ApiProperty } from '@nestjs/swagger';
import ColumnNumericTransformer from 'src/helpers/numeric-transformer.helper';
import { Expense } from 'src/modules/expenses/entities/expense.entity';
import { SupplierConsortium } from 'src/modules/suppliers/entities/suppliers-consortiums.entity';
import { EXPENDITURE_CATEGORY, EXPENDITURE_STATUS } from 'src/utils/constants';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'expenditures',
})
export class Expenditure {
  /**
   * El id del Gasto (UUID v4)
   * @example "5e4d5f8b-2e6d-4f49-9b3e-8d6c6f7e8a5b"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * El monto del Gasto
   * @example "1500.50"
   */
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  total_amount: number;

  /**
   * La descripción del Gasto
   * @example "Gasto de luz"
   * */
  @Column({ length: 150, nullable: false })
  description: string;

  /**
   * La fecha del Gasto
   * @example "2022-01-01"
   */
  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  /**
   * El estado del Gasto
   * @enum {EXPENDITURE_STATUS}
   * @example "pagado"
   * @example "impago"
   * */
  @Column({
    type: 'enum',
    enum: EXPENDITURE_STATUS,
    default: EXPENDITURE_STATUS.UNPAID,
  })
  status: EXPENDITURE_STATUS;

  @ApiProperty({
    enum: Object.values(EXPENDITURE_CATEGORY),
    enumName: 'EXPENDITURE_CATEGORY',
    description: 'Categoría del gasto',
    example: EXPENDITURE_CATEGORY.UTILITIES, // Puedes proporcionar un valor de ejemplo
  })
  @ApiProperty({
    enum: [
      {
        value: EXPENDITURE_CATEGORY.UTILITIES,
        description: 'Servicios Públicos',
      },
      {
        value: EXPENDITURE_CATEGORY.SERVICE_SUBSCRIPTION,
        description: 'Abono de Servicios',
      },
      {
        value: EXPENDITURE_CATEGORY.COMMON_AREA_MAINTENANCE,
        description: 'Mantenimiento de partes comunes',
      },
      {
        value: EXPENDITURE_CATEGORY.BANK_FEES,
        description: 'Gastos bancarios',
      },
      {
        value: EXPENDITURE_CATEGORY.CLEANING_EXPENSES,
        description: 'Gastos de limpieza',
      },
      {
        value: EXPENDITURE_CATEGORY.ADMINISTRATIVE_EXPENSES,
        description: 'Gastos administrativos',
      },
      { value: EXPENDITURE_CATEGORY.INSURANCES, description: 'Seguro' },
      { value: EXPENDITURE_CATEGORY.SALARIES, description: 'Sueldos' },
      { value: EXPENDITURE_CATEGORY.OTHER_EXPENSES, description: 'Otros' },
    ],
  })
  @Column({ type: 'enum', enum: EXPENDITURE_CATEGORY })
  category: EXPENDITURE_CATEGORY;

  /**
   * El número de la factura (cuatro dígitos para el punto de venta y 8 dígitos para el número de la factura de ese punto de venta)
   * @example "000112345678"
   */
  @Column({ length: 12, nullable: false })
  invoice_number: string;

  /**
   * Indica si el gasto se encuentra activo
   * @example true
   */
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Expense, (expense) => expense.expenditures)
  @JoinColumn({ name: 'expense_id' })
  expense: Expense;

  /**
   * El proveedor del consorcio al que pertenece el gasto
   * @example "Proveedor XYZ"
   * */
  @ManyToOne(
    () => SupplierConsortium,
    (supplierConsortium) => supplierConsortium.expenditures,
  )
  @JoinColumn([
    { name: 'supplier_id', referencedColumnName: 'supplier_id' },
    { name: 'consortium_id', referencedColumnName: 'consortium_id' },
  ])
  supplier_consortium: SupplierConsortium;
}
