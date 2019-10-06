import { Swipe } from './Swipe';
import { MatchUser } from './MatchUser';
import { Match } from './Match';
import {
  Model,
  PrimaryKey,
  IsUUID,
  Column,
  Table,
  Unique,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
  HasMany
} from 'sequelize-typescript';

@Table({ freezeTableName: true })
export class User extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Column
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column
  securityCode: string;

  @Column
  age: number;

  @Column
  elo: number;

  @BelongsToMany(() => Match, () => MatchUser)
  matches: Match[];

  @HasMany(() => Swipe, 'userId')
  swipes: Swipe[]

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
