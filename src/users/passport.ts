import { AuthService } from '../services/auth.service';
import { authSettings } from '../config/index';
import { use } from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Container } from 'typedi';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: authSettings.jwtSecret
};

const authService = Container.get(AuthService);

use(new JWTStrategy(opts, authService.validateJWT));
