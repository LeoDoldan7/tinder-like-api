import { Table, Model, IsUUID, PrimaryKey, Column, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Match } from './Match';
import { User } from './User';

@Table({ freezeTableName: true })
export class MatchUser extends Model {
    @IsUUID('4')
    @PrimaryKey
    @Column
    id: string;

    @ForeignKey(() => User)
    @Column
    userId: string;

    @ForeignKey(() => Match)
    @Column
    matchId: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Match)
    match: Match;
}
