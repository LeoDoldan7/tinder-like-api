import './auth/passport';
import { Router } from 'express';
import api from './routers/api';
import auth from './auth/routes';

const router = Router();

router.use('/api', api);
router.use('/auth', auth);

export default router;
