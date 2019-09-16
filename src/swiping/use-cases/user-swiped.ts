import { SwipeMapper } from './../mappers/swipe-mapper';
import { Swipe } from '../domain/swipe';
import { SwipeService } from '../services/swipe-service';
import { UseCase } from '../../core/use-case';
import { Result } from '../../core/result';
import { Inject, Service } from 'typedi';
import { swipingEvents, swipingEventEmitter } from '../domain/events';
import { SwipeDTO } from '../infrastructure/dto/swipe-dto';

@Service()
export class UserSwipedUseCase implements UseCase<SwipeDTO, Result<Swipe>> {
  @Inject()
  swipeService: SwipeService;

  @Inject()
  mapper: SwipeMapper;

  async execute(dto: SwipeDTO): Promise<Result<Swipe>> {
    const result = this.mapper.fromDTOtoDomain(dto);

    if (result.isSuccess) {
      const swipe = result.getValue();
      await this.swipeService.save(swipe);
      if (swipe.props.liked) {
        swipingEventEmitter.emit(swipingEvents.USER_SUIPED_RIGHT, swipe);
      }
    }

    return result;
  }
}
