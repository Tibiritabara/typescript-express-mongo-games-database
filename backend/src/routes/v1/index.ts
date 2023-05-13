import { Router } from 'express';
import gamesRouter from './games';
import trendsRouter from './trends';

const router: Router = Router();
router.use('/games', gamesRouter);
router.use('/trends', trendsRouter);

export default router;
