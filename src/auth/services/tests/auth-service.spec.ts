import { UserService } from './../user-service';
import { compareSync } from 'bcryptjs';
import { JWTPayload } from './../../passport';
import { User as UserModel } from '../../../database/models/User';
import { AuthService } from './../auth-service';
import Container from 'typedi';
import { Result } from '../../../core/result';

describe('Testing Auth Service in Authentication subsystem.', () => {
  let mockUser: UserModel;
  let mockPayload: JWTPayload;
  let mockPayloadFail: JWTPayload;
  let service: AuthService;

  class MockRepo {
    findOne(options: any): Result<UserModel> {
      if (options.where.email === mockUser.email) {
        return Result.ok<UserModel>(mockUser);
      } else {
        return Result.fail<UserModel>('Not found');
      }
    }
  }

  Container.set(UserService, new MockRepo());

  beforeEach(() => {
    mockUser = {
      id:           '1',
      firstName:    'test',
      lastName:     'test',
      email:        'test',
      password:     'test',
      securityCode: 'test'
    } as UserModel;
    mockPayload = {
      firstName:    'test',
      lastName:     'test',
      email:        'test',
      password:     'test',
      securityCode: 'test'
    };
    mockPayloadFail = {
      firstName:    'dont',
      lastName:     'dont',
      email:        'dont',
      password:     'dont',
      securityCode: 'dont'
    };
    service = Container.get(AuthService);
  });

  test('Token should be valid', async() => {
    const result = await service.validateToken(mockPayload);
    expect(result.isSuccess).toBe(true);
  });

  test('Token of a different user should not be valid', async() => {
    const result = await service.validateToken(mockPayloadFail);
    expect(result.isSuccess).toBe(false);
  });

  test('Login should be successful', async() => {
    (compareSync as any) = jest.fn;
    (compareSync as any).mockReturnvalue = 'test';
    const result = await service.login(mockUser.email, mockUser.password);
    expect(result.isSuccess).toBe(true);
  });

  test('Login should fail', async() => {
    const result = await service.login('fail email', 'fail password');
    expect(result.isSuccess).toBe(false);
  });
});
