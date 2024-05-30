import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'providers',
})
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ type: 'char', length: 11, unique: true })
  cuit: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 25 })
  phone_number: string;

  @Column()
  address: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 }) // Pendiente definir como se manejara el formato de número
  balance: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
