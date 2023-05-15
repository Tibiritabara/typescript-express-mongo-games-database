import { NextFunction, Request, Response } from "express";

class MainController {
    async health(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({ message: 'OK' });
    }

    async home(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({ message: 'Hello World!' });
    }
}

export default new MainController();
