import { Swipe } from './../swipe';
import { UserSwipedRightUseCase } from './../../use-cases/user-swiped-right';
import { swipingEvents, swipingEventEmitter } from '.';
import Container from 'typedi';

const userSwipedRightUseCase = Container.get(UserSwipedRightUseCase);

swipingEventEmitter.on(swipingEvents.USER_SUIPED_RIGHT, (swipe: Swipe) =>
  userSwipedRightUseCase.execute(swipe)
);
