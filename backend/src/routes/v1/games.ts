import { Router } from 'express';
import GameController from '../../controllers/GameController';
import { Validate, Requirements } from '../../validations';

const gamesRouter: Router = Router();

gamesRouter
    .route('/')
    .post(
        Validate(Requirements.games.create),
        GameController.create
    )
    .get(
        Validate(Requirements.games.search),
        GameController.search
    );

gamesRouter
    .route('/:id')
    .get(
        Validate(Requirements.games.findById),
        GameController.findById
    ).put(
        Validate(Requirements.games.update),
        GameController.update
    )
    .patch(
        Validate(Requirements.games.patch),
        GameController.patch
    )
    .delete(
        Validate(Requirements.games.delete),
        GameController.delete
    );

export default gamesRouter;
