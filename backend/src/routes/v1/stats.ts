import { Router } from 'express';
import StatsController from '../../controllers/StatsController';
import { Validate, Requirements } from '../../validations';

const statsRouter: Router = Router();

statsRouter
    .route('/:period')
    .put(
        Validate(Requirements.stats.update),
        StatsController.update
    );

export default statsRouter;
