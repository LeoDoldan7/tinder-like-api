import { MatchUser } from './MatchUser';
import { User } from './User';
import {
  Table,
  PrimaryKey,
  IsUUID,
  Column,
  Model,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript';

@Table
export class Match extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  cancelled: boolean;

  @BelongsToMany(() => User, () => MatchUser)
  users: User[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
