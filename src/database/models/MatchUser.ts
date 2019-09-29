import { Match } from './Match';
import { User } from './User';
import {
  Table,
  PrimaryKey,
  IsUUID,
  Column,
  Model,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript';

@Table
export class MatchUser extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @ForeignKey(() => Match)
  @Column
  matchId: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
