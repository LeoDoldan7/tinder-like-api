import { MatchUser } from './MatchUser';
import { Match } from './Match';
import {
  Model,
  PrimaryKey,
  IsUUID,
  Column,
  Table,
  BelongsToMany,
  Unique,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript';

@Table({
  freezeTableName: true
})
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

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
