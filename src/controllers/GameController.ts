import { NextFunction, Request, Response } from "express";
import { GameInput, GameId } from "../dtos/Game";
import * as JsonApiTypes from "../dtos/JsonApi";
import GameService from "../services/GameService";
import Logger from "../services/logger";

const objectTypes = 'games'

class GameController {
    async create(req: Request, res: Response, next: NextFunction) {
        const requestBody: JsonApiTypes.SingleObjectBody = req.body;
        const gameInput: GameInput = requestBody.attributes as GameInput;
        Logger.info(`Request body: ${JSON.stringify(gameInput)}`);
        const [gameId, game] = await GameService.create(gameInput);
        const objectAttributes: JsonApiTypes.ObjectAttributes = {
            attributes: game,
        }
        // const gameOutput: GameOutput = game as GameOutput;
        const objectData: JsonApiTypes.SingleObjectData = {
            type: objectTypes as JsonApiTypes.ObjectType,
            id: gameId,
            attributes: objectAttributes,
        };

        const SingleObjectResponse: JsonApiTypes.SingleObjectResponse = {
            data: objectData,
        }
        // const gameOutput: GameOutput = await GameService.create(gameInput);
        res.status(201).json(SingleObjectResponse);
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as GameId;
        const game = await GameService.findById(id);
        const objectAttributes: JsonApiTypes.ObjectAttributes = {
            attributes: game,
        }
        const objectData: JsonApiTypes.SingleObjectData = {
            type: objectTypes as JsonApiTypes.ObjectType,
            id: id,
            attributes: objectAttributes,
        };
        const SingleObjectResponse: JsonApiTypes.SingleObjectResponse = {
            data: objectData,
        }
        res.status(200).json(SingleObjectResponse);
    }

}

export default new GameController();
