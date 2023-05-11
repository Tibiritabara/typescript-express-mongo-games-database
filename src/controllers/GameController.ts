import { NextFunction, Request, Response } from "express";
import { GameInput, GameOutput } from "../dtos/Game";
import GameService from "../services/GameService";

class GameController {
    async create(req: Request, res: Response, next: NextFunction) {
        const gameInput: GameInput = req.body;
        const gameOutput: GameOutput = await GameService.create(gameInput);
        res.status(201).json(gameOutput);
    }
}

export default new GameController();
