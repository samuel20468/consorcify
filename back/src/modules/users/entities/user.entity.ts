import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 80, nullable: false })
  firstName: string;

  @Column({ length: 80, nullable: false })
  lastName: string;

  @Column({ length: 320, unique: true, nullable: false })
  email: string;

  @Column({ length: 72, nullable: false })
  password: string;
  
  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isSuperAdmin: boolean;
}
