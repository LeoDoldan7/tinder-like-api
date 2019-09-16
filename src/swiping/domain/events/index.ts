import { EventEmitter } from 'events';

export const swipingEventEmitter = new EventEmitter();

export enum swipingEvents {
  USER_SUIPED_RIGHT = 'userSwipedRight',
  MATCH_CREATED = 'matchCreated'
}
