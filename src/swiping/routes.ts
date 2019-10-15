import { SwipingController } from './controllers/swiping-controller';
import { Router } from 'express';
import Container from 'typedi';

const controller = Container.get(SwipingController);

const router = Router();

router
  .route('/')
  .post((req, res, next) => controller.userSwiped(req, res, next));

export default router;
