import { Column, Entity } from 'typeorm';

@Entity()
export class Test_user {
  @Column()
  name: string;

  @Column()
  age: number;
}
