import { AuthService } from './services/auth-service';
import { authSettings } from '../config/index';
import { use } from 'passport';
import {
  ExtractJwt,
  Strategy as JWTStrategy,
  VerifiedCallback
} from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Container } from 'typedi';

export interface JWTPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  securityCode: string;
}

const authService = Container.get(AuthService);
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:    authSettings.JWT_SECRET
};

use(
  new JWTStrategy(opts, async(payload: JWTPayload, done: VerifiedCallback) => {
    const result = await authService.validateToken(payload);
    if (result.isSuccess) {
      return done(null, result.getValue());
    } else {
      return done(result.error);
    }
  })
);

use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async(email, password, done) => {
    const result = await authService.login(email, password);
    if (result.isSuccess) {
      const user = result.getValue();
      return done(null, user);
    } else {
      return done(result.error);
    }
  })
);
