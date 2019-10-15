import { Router } from 'express';
import swipe from '../swiping/routes';
import { authenticate } from 'passport';

const router = Router();

router.use(authenticate('jwt', { session: false }));

router.use('/swipe', swipe);

export default router;
