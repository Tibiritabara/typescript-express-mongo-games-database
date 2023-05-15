import { Router } from 'express';
import TrendController from '../../controllers/TrendController';
import { Validate, Requirements } from '../../validations';

const trendsRouter: Router = Router();

trendsRouter
    .route('/:period')
    .put(
        Validate(Requirements.trends.update),
        TrendController.update
    );

export default trendsRouter;
