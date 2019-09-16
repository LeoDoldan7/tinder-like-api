import { User } from './user';
import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable
} from 'typeorm';

@Entity()
export class Match extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  cancelled: boolean;

  @ManyToMany(_ => User)
  @JoinTable({ name: 'match_user' })
  users: User[];
}
