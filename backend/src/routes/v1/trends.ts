import { Router } from 'express';
import TrendController from '../../controllers/TrendController';

const trendsRouter: Router = Router();

trendsRouter
    .route('/:period')
    .put(
        TrendController.update
    );

export default trendsRouter;
