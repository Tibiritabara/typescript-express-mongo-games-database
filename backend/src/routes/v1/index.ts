import { Router } from 'express';
import gamesRouter from './games';
import trendsRouter from './trends';
import statsRouter from './stats';

const router: Router = Router();
router.use('/games', gamesRouter);
router.use('/trends', trendsRouter);
router.use('/stats', statsRouter);

export default router;
