import { Router } from 'express';
import CommonController from '../../controllers/MainController';

const mainRouter: Router = Router();

mainRouter
    .route('/health')
    .get(
        CommonController.health
    );

mainRouter
    .route('/')
    .get(
        CommonController.home
    );

export default mainRouter;
