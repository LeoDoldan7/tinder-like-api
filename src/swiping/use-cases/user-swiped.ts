import { SwipeMapper } from './../mappers/swipe-mapper';
import { Swipe } from '../domain/swipe';
import { SwipeService } from '../services/swipe-service';
import { UseCase } from '../../core/use-case';
import { Result } from '../../core/result';
import { Inject, Service } from 'typedi';
import { SwipeDTO } from '../infrastructure/dto/swipe-dto';
import { swipingEventEmitter, swipingEvents } from '../domain/events';

@Service()
export class UserSwipedUseCase implements UseCase<SwipeDTO, Result<Swipe>> {
  @Inject()
  private swipeService: SwipeService;

  @Inject()
  private mapper: SwipeMapper;

  async execute(dto: SwipeDTO): Promise<Result<Swipe>> {
    const result = this.mapper.fromDTOtoDomain(dto);

    if (result.isFailure) {
      throw result;
    }

    const swipe = result.getValue();
    const entity = this.mapper.toPersistance(swipe);
    const saveResult = await this.swipeService.save(entity);
    if (saveResult.isFailure) {
      throw saveResult.error;
    }
    if (saveResult.isSuccess && swipe.props.right) {
      swipingEventEmitter.emit(swipingEvents.USER_SWIPED_RIGHT);
    }

    return result;
  }
}
