import { Entity } from '../../core/entity';
import { Result } from '../../core/result';
import { AUTH_ERROR } from '../errors';

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  securityCode: string;
}

export class User extends Entity<UserProps> {
  static create(data: Partial<UserProps>): Result<User> {
    if (!data.password) {
      return Result.fail<User>(AUTH_ERROR.MISSING_PASSWORD);
    } else if (!data.email) {
      return Result.fail<User>(AUTH_ERROR.MISSING_EMAIL);
    } else if (!data.firstName) {
      return Result.fail<User>(AUTH_ERROR.MISSING_FIRST_NAME);
    } else if (!data.lastName) {
      return Result.fail<User>(AUTH_ERROR.MISSING_LAST_NAME);
    } else if (!data.age) {
      return Result.fail<User>(AUTH_ERROR.MISSING_AGE);
    } else {
      const user = new User(data as UserProps);
      return Result.ok<User>(user);
    }
  }
}
