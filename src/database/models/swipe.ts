import { Table, Model, IsUUID, PrimaryKey, Column, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './User';

@Table({ freezeTableName: true })
export class Swipe extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Column
  id: string;

  @Column
  right: boolean;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => User)
  @Column
  candidateId: string;

  @BelongsTo(() => User, 'userId')
  user?: User;

  @BelongsTo(() => User, 'candidateId')
  candidate?: User;
}
