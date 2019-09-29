import { JWTToken } from './../dto/jwt-token';
import { authSettings } from './../../config/index';
import { UserMapper } from '../mappers/user-mapper';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { bcryptSettings } from '../../config';
import { Service, Inject } from 'typedi';
import { JWTPayload } from '../passport';
import { User } from '../domain/user';
import { Result } from '../../core/result';
import { AUTH_ERROR } from '../errors';
import { UserService } from './user-service';
import { sign } from 'jsonwebtoken';

@Service()
export class AuthService {
  @Inject()
  protected userMapper: UserMapper;

  @Inject()
  protected userService: UserService;

  public generateSecurityCode(): string {
    return genSaltSync(bcryptSettings.SALT_ROUNDS);
  }

  public hashPassword(password: string): string {
    return hashSync(password, bcryptSettings.SALT_ROUNDS);
  }

  public createToken(user: User): JWTToken {
    const userDTO = this.userMapper.toDTO(user);
    const tokenData = this.userMapper.toToken(user);
    const token = sign(tokenData, authSettings.JWT_SECRET);
    return {
      user: userDTO,
      token
    };
  }

  public async validateToken(payload: JWTPayload): Promise<Result<User>> {
    const userWasFound = await this.userService.findOne({
      where: { email: payload.email }
    });
    if (userWasFound.isFailure || payload.securityCode != userWasFound.getValue().securityCode) {
      return Result.fail<User>(AUTH_ERROR.INVALID_USER);
    }
    const entity = userWasFound.getValue();
    const user = this.userMapper.toDomain(entity);
    return Result.ok<User>(user);
  }

  public async login(email: string, password: string): Promise<Result<User>> {
    const userWasFound = await this.userService.findOne({
      where: { email }
    });
    if (userWasFound.isFailure) {
      return Result.fail<User>(AUTH_ERROR.USER_NOT_FOUND);
    }
    const entity = userWasFound.getValue();
    if (this.compareStringAndHash(password, entity.password)) {
      const user = this.userMapper.toDomain(entity);
      return Result.ok<User>(user);
    } else {
      return Result.fail<User>(AUTH_ERROR.INVALID_CREDENTIALS);
    }
  }

  private compareStringAndHash(regularString: string, hash: string): boolean {
    return compareSync(regularString, hash);
  }
}
