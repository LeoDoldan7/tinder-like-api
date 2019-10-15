import { Swipe } from '../domain/swipe';
import { UserSwipedRightUseCase } from '../use-cases/user-swiped-right';
import Container from 'typedi';
import { swipingEventEmitter, swipingEvents } from '../domain/events';

const userSwipedRightUseCase = Container.get(UserSwipedRightUseCase);

function userSwipedRightHandler(swipe: Swipe): void {
  userSwipedRightUseCase.execute(swipe);
}

swipingEventEmitter.on(swipingEvents.USER_SWIPED_RIGHT, userSwipedRightHandler);
