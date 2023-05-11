import { Router } from 'express';

const trendsRouter: Router = Router();

trendsRouter
    .route('/:period')
    .get();

export default trendsRouter;
