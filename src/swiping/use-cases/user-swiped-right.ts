import { CreateMatchUseCase } from './create-match';
import { User } from './../domain/user';
import { SwipeService } from './../services/swipe-service';
import { Match } from './../domain/match';
import { Swipe } from './../domain/swipe';
import { UseCase } from './../../core/use-case';
import { Result } from '../../core/result';
import { Inject, Service } from 'typedi';

@Service()
export class UserSwipedRightUseCase implements UseCase<Swipe, Result<Match>> {
  @Inject()
  private swipeService: SwipeService;

  @Inject()
  private createMatchUseCase: CreateMatchUseCase;

  async execute(swipe: Swipe): Promise<Result<Match>> {
    const candidateSwipedRightToo = await this.candidateSwipedRightToo(swipe);
    if (candidateSwipedRightToo) {
      return this.createMatchUseCase.execute({
        users: [swipe.props.user, swipe.props.candidate] as User[]
      });
    }
    return Result.fail<Match>('Candidate did not like back');
  }

  async candidateSwipedRightToo(swipe: Swipe): Promise<boolean> {
    const swipedBackResult = await this.swipeService.findOne({
      where: {
        userId:      swipe.getCandidateId(),
        candidateId: swipe.getUserId(),
        right:       true
      }
    });
    return swipedBackResult.isSuccess;
  }
}
