import { User as UserModel } from '../../database/models/User';
import { User } from '../domain/user';
import { Service } from 'typedi';
import { TokenPayload } from '../dto/token-payload';

@Service()
export class UserMapper {
  toDomain(entity: UserModel): User {
    return {
      id:    entity.id,
      props: {
        firstName:    entity.firstName,
        lastName:     entity.lastName,
        email:        entity.email,
        age:          entity.age,
        password:     entity.password,
        securityCode: entity.securityCode
      }
    };
  }

  toPersistance(userData: User): UserModel {
    return UserModel.build({
      id:           userData.id,
      firstName:    userData.props.firstName,
      lastName:     userData.props.lastName,
      email:        userData.props.email,
      password:     userData.props.password,
      age:          userData.props.age,
      securityCode: userData.props.securityCode
    });
  }

  toDTO(user: User): User {
    return {
      id:    user.id,
      props: {
        ...user.props,
        password:     undefined,
        securityCode: undefined
      }
    };
  }

  toToken(user: User): TokenPayload {
    return {
      id:           user.id,
      email:        user.props.email,
      securityCode: user.props.securityCode
    };
  }
}
