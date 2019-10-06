import { Router } from 'express';
import swipe from '../swiping/routes';

const router = Router();

router.use('/swipe', swipe);

export default router;
