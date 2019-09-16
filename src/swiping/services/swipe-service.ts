import { SWIPING_ERRORS } from './../errors/index';
import { Swipe } from './../domain/swipe';
import { SwipeMapper } from './../mappers/swipe-mapper';
import { Swipe as SwipeModel } from '../../database/models/swipe';
import { BaseService } from '../../core/base-service';
import { Inject, Service } from 'typedi';
import { Result } from '../../core/result';
import { FindOneOptions } from 'typeorm';

@Service()
export class SwipeService extends BaseService<SwipeModel> {
  @Inject()
  mapper: SwipeMapper;

  constructor() {
    super(SwipeModel);
  }

  async save(swipe: Swipe): Promise<Result<null>> {
    const entity = this.mapper.toPersistance(swipe);
    await this.repository.save(entity);
    return Result.ok<null>(null);
  }

  async findOneSwipe(
    conditions: FindOneOptions<SwipeModel>
  ): Promise<Result<Swipe>> {
    const swipe = await this.repository.findOne(conditions);
    if (!!swipe) {
      const domainSwipe = this.mapper.toDomain(swipe);
      // It will always be successful, because you validated it before storing it
      if (domainSwipe.isSuccess) {
        return Result.ok<Swipe>(domainSwipe.getValue());
      }
    }
    return Result.fail<Swipe>(SWIPING_ERRORS.NO_SWIPE);
  }
}
