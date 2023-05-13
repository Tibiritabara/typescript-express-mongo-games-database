import { Router } from 'express';
import GameController from '../../controllers/GameController';

const gamesRouter: Router = Router();

gamesRouter
    .route('/')
    .post(
        GameController.create
    )
    .get(
        GameController.search
    );

gamesRouter
    .route('/:id')
    .get(
        GameController.findById
    ).put(
        GameController.update
    )
    .patch()
    .delete(
        GameController.delete
    );

export default gamesRouter;
