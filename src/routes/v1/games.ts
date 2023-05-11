import { Router } from 'express';

const gamesRouter: Router = Router();

gamesRouter
    .route('/')
    .post()
    .get();

gamesRouter
    .route('/:id')
    .get()
    .put()
    .patch()
    .delete();

export default gamesRouter;
