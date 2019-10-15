import { Table, Model, IsUUID, PrimaryKey, Column, BelongsToMany } from 'sequelize-typescript';
import { User } from './User';
import { MatchUser } from './MatchUser';

@Table({ freezeTableName: true })
export class Match extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Column
  id: string;

  @Column
  cancelled: boolean;

  @BelongsToMany(() => User, () => MatchUser)
  users: User[];
}
