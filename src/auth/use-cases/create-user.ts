import { User as UserModel } from './../../database/models/User';
import { UserMapper } from './../mappers/user-mapper';
import { SignUpRequestDTO } from './../dto/user-dto';
import { User } from './../domain/user';
import { AuthService } from './../services/auth-service';
import { UseCase } from '../../core/use-case';
import { Inject, Service } from 'typedi';
import { Result } from '../../core/result';
import { UserService } from '../services/user-service';
import { UniqueConstraintError } from 'sequelize';

@Service()
export class CreateUserUseCase
implements UseCase<SignUpRequestDTO, Result<void>> {
  @Inject()
  private authService: AuthService;

  @Inject()
  private userService: UserService;

  @Inject()
  private mapper: UserMapper;

  async execute(dto: SignUpRequestDTO): Promise<Result<void>> {
    const newUserResult = this.createUser(dto);
    const userEntityResult = this.createUserEntity(newUserResult.getValue());
    await this.saveUser(userEntityResult.getValue());
    return Result.ok<void>();
  }

  createUser(dto: SignUpRequestDTO): Result<User> {
    const userProps = {
      ...dto,
      password:     this.authService.hashPassword(dto.password),
      securityCode: this.authService.generateSecurityCode()
    };
    const newUserResult = User.create(userProps);
    if (newUserResult.isSuccess) {
      return Result.ok<User>(newUserResult.getValue());
    } else {
      throw Result.fail<User>(newUserResult.error);
    }
  }

  createUserEntity(user: User): Result<UserModel> {
    const entity = this.mapper.toPersistance(user);
    return Result.ok<UserModel>(entity);
  }

  async saveUser(userEntityData: UserModel): Promise<Result<void>> {
    const saveResult = await this.userService.save(userEntityData);
    if (saveResult.isSuccess) {
      return Result.ok<void>();
    } else {
      const error = saveResult.error;
      this.validateError(error);
      throw Result.fail<void>(error);
    }
  }

  validateError(error: any): void {
    if (error instanceof UniqueConstraintError) {
      if (!!error.fields.email)
        throw Result.fail<void>(`Email ${error.fields.email} already exists.`);
    }
  }
}
