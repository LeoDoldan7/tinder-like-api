import { UserMapper } from './user-mapper';
import { Swipe as SwipeModel } from '../../database/models/Swipe';
import { Swipe } from './../domain/swipe';
import { Service, Inject } from 'typedi';
import { SwipeDTO } from '../infrastructure/dto/swipe-dto';
import { Result } from '../../core/result';

@Service()
export class SwipeMapper {
  @Inject()
  userMapper: UserMapper;

  toPersistance(swipe: Swipe): SwipeModel {
    return SwipeModel.build({
      id:          swipe.id,
      userId:      swipe.getUserId(),
      candidateId: swipe.getCandidateId(),
      right:       swipe.props.right
    });
  }

  fromDTOtoDomain(dto: SwipeDTO): Result<Swipe> {
    return Swipe.create({
      right:       dto.right,
      userId:      dto.userId,
      candidateId: dto.candidateId
    });
  }

  toDomain(swipeEntity: SwipeModel): Result<Swipe> {
    const userOrUndefined = swipeEntity.user
      ? this.userMapper.toDomainUser(swipeEntity.user)
      : undefined;
    const candidateOrUndefined = swipeEntity.candidate
      ? this.userMapper.toDomainCandidate(swipeEntity.candidate)
      : undefined;
    return Swipe.create(
      {
        right:     swipeEntity.right,
        user:      userOrUndefined,
        candidate: candidateOrUndefined,
        userId:    userOrUndefined ? userOrUndefined.id : undefined
      },
      swipeEntity.id
    );
  }
}
