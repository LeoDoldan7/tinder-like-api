import { Candidate } from './../domain/candidate';
import { User as UserModel } from '../../database/models/User';
import { User } from './../domain/user';
import { Service } from 'typedi';

@Service()
export class UserMapper {
  toDomainUser(userEntity: UserModel): User {
    return {
      id:    userEntity.id,
      props: null
    };
  }

  toDomainCandidate(userEntity: UserModel): Candidate {
    return {
      id:    userEntity.id,
      props: null
    };
  }
}
