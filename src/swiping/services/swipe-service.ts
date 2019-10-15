import { SwipeMapper } from './../mappers/swipe-mapper';
import { Swipe as SwipeModel } from '../../database/models/Swipe';
import { BaseService } from '../../core/base-service';
import { Inject, Service } from 'typedi';

@Service()
export class SwipeService extends BaseService<SwipeModel> {
  @Inject()
  mapper: SwipeMapper;

  constructor() {
    super(SwipeModel);
  }
}
