import { User } from './../domain/user';
import { Match } from '../domain/match';
import { UseCase } from '../../core/use-case';
import { Result } from '../../core/result';
import { Service } from 'typedi';
import { swipingEvents, swipingEventEmitter } from '../domain/events';

interface MatchRequest {
  users: User[];
}

@Service()
export class CreateMatchUseCase
  implements UseCase<MatchRequest, Result<Match>> {
  async execute(req: MatchRequest): Promise<Result<Match>> {
    const result = await Match.create(req);

    if (result.isSuccess) {
      const match = result.getValue();
      swipingEventEmitter.emit(swipingEvents.MATCH_CREATED, match);
    }

    return result;
  }
}
