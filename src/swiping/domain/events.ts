import { EventEmitter } from 'events';

export enum swipingEvents {
  USER_SWIPED_RIGHT = 'userSwipedRight',
  MATCH_CREATED = 'matchCreated'
}

export const swipingEventEmitter = new EventEmitter();
