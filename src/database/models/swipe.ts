import { User } from './User';
import {
  Table,
  Model,
  PrimaryKey,
  IsUUID,
  Column,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript';

@Table
export class Swipe extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Column
  id: string;

  @Column
  liked: boolean;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @Column
  candidateId: string;

  @BelongsTo(_ => User, 'userId')
  user?: User;

  @BelongsTo(_ => User, 'candidateId')
  candidate?: User;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
