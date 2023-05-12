import { Router } from 'express';
import GameController from '../../controllers/GameController';

const gamesRouter: Router = Router();

gamesRouter
    .route('/')
    .post(
        GameController.create
    )
    .get();

gamesRouter
    .route('/:id')
    .get(
        GameController.findById
    ).put()
    .patch()
    .delete();

export default gamesRouter;
