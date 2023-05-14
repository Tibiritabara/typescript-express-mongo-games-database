import { Router } from 'express';
import StatsController from '../../controllers/StatsController';

const statsRouter: Router = Router();

statsRouter
    .route('/:period')
    .put(
        StatsController.update
    );

export default statsRouter;
