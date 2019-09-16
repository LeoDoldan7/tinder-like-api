import { Service, Inject } from 'typedi';
import { VerifiedCallback } from 'passport-jwt';
import { UserService } from './user.service';

@Service()
export class AuthService {
  @Inject()
  userService: UserService;

  async validateJWT(payload: any, done: VerifiedCallback) {
    const user = await this.userService.repository.findOne(payload.id);
    if (!user) {
      return;
    }
  }
}
