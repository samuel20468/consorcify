import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'functional_units',
  })
export class FunctionalUnit {

    @PrimaryGeneratedColumn('uuid')
    id: string;
}
