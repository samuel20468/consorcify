import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'providers',
})
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ type: 'char', length: 13, unique: true })
  cuit: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 25 })
  phoneNumber: string;

  @Column()
  address: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 }) // Pendiente definir como se manejara el formato de número
  balance: number;

  @Column({ type: 'boolean' })
  active: boolean;
}
