import { User } from './user';
import { Entity } from './../../core/entity';
import { Candidate } from './candidate';
import { Result } from '../../core/result';
import { SWIPING_ERRORS } from '../errors';

interface SwipeProps {
  liked: boolean;
  fromId?: string;
  toId?: string;
  from?: User;
  to?: Candidate;
}

export class Swipe extends Entity<SwipeProps> {
  static create(props: SwipeProps, id?: string): Result<Swipe> {
    if (!props.from || !props.fromId) {
      return Result.fail<Swipe>(SWIPING_ERRORS.NO_USER_ID);
    }
    if (!props.to || !props.toId) {
      return Result.fail<Swipe>(SWIPING_ERRORS.NO_CANDIDATE_ID);
    }
    this.parseProps(props);
    const newSwipe = new Swipe(props, id);
    return Result.ok<Swipe>(newSwipe);
  }

  getFromId() {
    if (this.props.from) {
      return this.props.from.id;
    } else {
      return this.props.fromId;
    }
  }

  getToId() {
    if (this.props.to) {
      return this.props.to.id;
    } else {
      return this.props.toId;
    }
  }

  static parseProps(props: SwipeProps) {
    if (props.from && props.from.id) {
      props.fromId = props.from.id;
    } else {
      props.from = { id: props.fromId, props: null };
    }
    if (props.to && props.to.id) {
      props.toId = props.to.id;
    } else {
      props.to = { id: props.toId, props: null };
    }
  }
}
