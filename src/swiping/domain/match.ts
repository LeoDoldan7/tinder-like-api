import { User } from './user';
import { Entity } from './../../core/entity';
import { Result } from '../../core/result';

interface MatchProps {
  cancelled?: boolean;
  users: User[];
}

export class Match extends Entity<MatchProps> {
  static create(props: MatchProps): Result<Match> {
    if (!props.users || props.users.length != 2) {
      return Result.fail<Match>('A match needs to have two users');
    }
    props.cancelled = !!props.cancelled;
    const newMatch = new Match(props);
    return Result.ok<Match>(newMatch);
  }
}
