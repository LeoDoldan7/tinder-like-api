import { UserMapper } from './user-mapper';
import { Swipe as SwipeModel } from './../../database/models/swipe';
import { Swipe } from './../domain/swipe';
import { Service, Inject } from 'typedi';
import { SwipeDTO } from '../infrastructure/dto/swipe-dto';
import { Result } from '../../core/result';

@Service()
export class SwipeMapper {
  @Inject()
  userMapper: UserMapper;

  toPersistance(swipe: Swipe): SwipeModel {
    return SwipeModel.create({
      id: swipe.id as string,
      fromId: swipe.getFromId() as string,
      toId: swipe.getToId() as string,
      liked: swipe.props.liked
    });
  }

  fromDTOtoDomain(dto: SwipeDTO): Result<Swipe> {
    return Swipe.create({
      liked: dto.liked
    });
  }

  toDomain(swipeEntity: SwipeModel): Result<Swipe> {
    const userOrUndefined = swipeEntity.from
      ? this.userMapper.toDomainUser(swipeEntity.from)
      : undefined;
    const candidateOrUndefined = swipeEntity.to
      ? this.userMapper.toDomainCandidate(swipeEntity.to)
      : undefined;
    return Swipe.create(
      {
        liked: swipeEntity.liked,
        from: userOrUndefined,
        to: candidateOrUndefined,
        fromId: userOrUndefined ? userOrUndefined.id : undefined
      },
      swipeEntity.id
    );
  }
}
