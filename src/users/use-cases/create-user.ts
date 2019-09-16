import { UseCase } from './../../core/use-case';

// TODO: Implement this

interface CreateUserRequest {}

interface CreateUserResponse {}
export class CreateUserUseCase
  implements UseCase<CreateUserRequest, CreateUserResponse> {
  execute(req: CreateUserRequest) {
    return {};
  }
}
