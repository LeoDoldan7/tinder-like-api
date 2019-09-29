import { AuthService } from './../../services/auth-service';
import { UserSignUpRequestDTO } from './../../dto/user-dto';
import { CreateUserUseCase } from './../create-user';
import Container from 'typedi';
import { UserService } from '../../services/user-service';

describe('Testing Auth subsystem, CreateUserUseCase', () => {
  let userData: UserSignUpRequestDTO;
  let useCase: CreateUserUseCase;

  class MockAuthService {
    hashPassword(something: string): string {
      return something;
    }

    generateSecurityCode(something: string): string {
      return something;
    }
  }

  class MockUserService {
    save(): Promise<void> {
      return Promise.resolve();
    }
  }

  beforeEach(() => {
    Container.set(AuthService, new MockAuthService());
    Container.set(UserService, new MockUserService());
    useCase = Container.get(CreateUserUseCase);
    userData = {
      firstName: 'test',
      lastName:  'test',
      email:     'test',
      password:  'test',
      age:       18
    };
  });

  test('Creating user without first name', async() => {
    delete userData.firstName;
    const result = await useCase.execute(userData);
    expect(result.isSuccess).toBe(false);
  });

  test('Creating user without last name', async() => {
    delete userData.lastName;
    const result = await useCase.execute(userData);
    expect(result.isSuccess).toBe(false);
  });

  test('Creating user without password', async() => {
    delete userData.password;
    const result = await useCase.execute(userData);
    expect(result.isSuccess).toBe(false);
  });

  test('Creating user without email', async() => {
    delete userData.email;
    const result = await useCase.execute(userData);
    expect(result.isSuccess).toBe(false);
  });

  test('Creating user without age', async() => {
    delete userData.age;
    const result = await useCase.execute(userData);
    expect(result.isSuccess).toBe(false);
  });
});
