import { User } from './../../domain/user';
import { AuthService } from './../../services/auth-service';
import { SignUpRequestDTO } from './../../dto/user-dto';
import { CreateUserUseCase } from './../create-user';
import Container from 'typedi';
import { UserService } from '../../services/user-service';
import { Result } from '../../../core/result';

describe('Testing Auth subsystem, CreateUserUseCase', () => {
  let userData: SignUpRequestDTO;
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
    await useCase.execute(userData)
      .then(() => {
        fail('The test failed because the user was created successfully.');
      })
      .catch((err: Result<User>) => {
        expect(err.isFailure).toBe(true);
      })
    ;
  });

  test('Creating user without last name', async() => {
    delete userData.lastName;
    await useCase.execute(userData)
      .then(() => fail('The test failed because the user was created successfully.'))
      .catch((err: Result<User>) => {
        expect(err.isFailure).toBe(true);
      });
  });

  test('Creating user without password', async() => {
    delete userData.password;
    await useCase.execute(userData)
      .then(() => fail('The test failed because the user was created successfully.'))
      .catch((err: Result<User>) => {
        expect(err.isFailure).toBe(true);
      });
  });

  test('Creating user without email', async() => {
    delete userData.email;
    await useCase.execute(userData)
      .then(() => fail('The test failed because the user was created successfully.'))
      .catch((err: Result<User>) => {
        expect(err.isFailure).toBe(true);
      });
  });

  test('Creating user without age', async() => {
    delete userData.age;
    await useCase.execute(userData)
      .then(() => fail('The test failed because the user was created successfully.'))
      .catch((err: Result<User>) => {
        expect(err.isFailure).toBe(true);
      });
  });
});
