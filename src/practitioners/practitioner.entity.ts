import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Practitioner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  bio: string;

  @Column()
  specialization: string;
}
