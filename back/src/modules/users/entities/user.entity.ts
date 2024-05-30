import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 80, nullable: false })
  first_name: string;

  @Column({ length: 80, nullable: false })
  last_name: string;

  @Column({ length: 320, unique: true, nullable: false })
  email: string;

  @Column({ length: 72, nullable: false })
  password: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  isSuperAdmin: boolean;
}
