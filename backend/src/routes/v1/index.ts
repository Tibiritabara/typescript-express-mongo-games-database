import { Router } from 'express';
import gamesRouter from './games';
import trendsRouter from './trends';
import statsRouter from './stats';
import { errorHandler } from '../../exceptions/ErrorHandler';
import { Request, Response, NextFunction } from 'express';

const router: Router = Router();
router.use('/games', gamesRouter);
router.use('/trends', trendsRouter);
router.use('/stats', statsRouter);
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler.handleError(err, res);
});

export default router;
