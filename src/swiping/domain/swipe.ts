import { User } from './user';
import { Entity, EntityId } from './../../core/entity';
import { Candidate } from './candidate';
import { Result } from '../../core/result';
import { SWIPING_ERRORS } from '../errors';

interface SwipeProps {
  right: boolean;
  userId?: string;
  candidateId?: string;
  user?: User;
  candidate?: Candidate;
}

export class Swipe extends Entity<SwipeProps> {

  static create(props: SwipeProps, id?: string): Result<Swipe> {
    if (!props.user && !props.userId) {
      return Result.fail<Swipe>(SWIPING_ERRORS.NO_USER_ID);
    }
    if (!props.candidate && !props.candidateId) {
      return Result.fail<Swipe>(SWIPING_ERRORS.NO_CANDIDATE_ID);
    }
    this.parseProps(props);
    const newSwipe = new Swipe(props, id);
    return Result.ok<Swipe>(newSwipe);
  }

  getUserId(): EntityId {
    if (this.props.user) {
      return this.props.user.id;
    } else {
      return this.props.userId;
    }
  }

  getCandidateId(): EntityId {
    if (this.props.candidate) {
      return this.props.candidate.id;
    } else {
      return this.props.candidateId;
    }
  }

  static parseProps(props: SwipeProps): void {
    if (props.user && props.user.id) {
      props.userId = props.user.id;
    } else {
      props.user = { id: props.userId, props: null };
    }
    if (props.candidate && props.candidate.id) {
      props.candidateId = props.candidate.id;
    } else {
      props.candidate = { id: props.candidateId, props: null };
    }
  }
}
