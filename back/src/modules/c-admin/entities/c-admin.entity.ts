import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'consortium_admins',
})
export class CAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 25 })
  username: string;

  @Column({ type: 'char', length: 60 })
  password: string;

  @Column({ type: 'bigint' })
  phoneNumber: number;

  @Column({ length: 50, nullable: true })
  country: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column()
  address: string;

  @Column({ type: 'date' })
  hireDate: Date;

  // Relación con Consortium 1:1
  //   @OneToOne(() => Consortium, consortium => consortium.cAdmin)
  //   @JoinColumn({
  //     name: 'consortium_id',
  //   })
  //   consortium: Consortium;
}
