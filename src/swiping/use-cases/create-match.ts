import { User } from './../domain/user';
import { Match } from '../domain/match';
import { UseCase } from '../../core/use-case';
import { Result } from '../../core/result';
import { Service, Inject } from 'typedi';
import { swipingEvents } from '../domain/events';
import { SwipingEventHub } from '../infrastructure/event-hub';

interface MatchRequest {
  users: User[];
}

@Service()
export class CreateMatchUseCase
implements UseCase<MatchRequest, Result<Match>> {
  @Inject()
  eventHub: SwipingEventHub;

  async execute(req: MatchRequest): Promise<Result<Match>> {
    const result = await Match.create(req);

    if (result.isSuccess) {
      // const match = result.getValue();
      // this.eventHub.emit(swipingEvents.MATCH_CREATED, match);
    }

    return result;
  }
}
