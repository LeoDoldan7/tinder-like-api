import { Router } from 'express';
import api from './routers/api';

const router = Router();

router.use('/api', api);

export default router;
