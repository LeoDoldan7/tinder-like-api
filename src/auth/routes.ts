import { AuthController } from './controllers/auth-controller';
import { Router } from 'express';
import passport = require('passport');
import Container from 'typedi';
const controller = Container.get(AuthController);

const router = Router();

router
  .route('/login')
  .post(passport.authenticate('local', { session: false }))
  .post((...args) => controller.generateToken(...args));

router
  .route('/signup')
  .post((...args) => controller.signup(...args));

export default router;
