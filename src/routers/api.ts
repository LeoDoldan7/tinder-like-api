import { Router } from 'express';
import { authenticate } from 'passport';
import swipe from '../swiping/routes';

const router = Router();

router.use(authenticate('jwt', { session: false }));

router.use('/swipe', swipe);

export default router;
