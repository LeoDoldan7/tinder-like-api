import { User } from './user';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity
} from 'typeorm';

@Entity()
export class Swipe extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  liked: boolean;

  @Column({ name: 'from_id' })
  fromId: string;

  @Column({ name: 'to_id' })
  toId: string;

  @ManyToOne(_ => User)
  @JoinColumn({ name: 'from_id' })
  from?: User;

  @ManyToOne(_ => User)
  @JoinColumn({ name: 'to_id' })
  to?: User;
}
