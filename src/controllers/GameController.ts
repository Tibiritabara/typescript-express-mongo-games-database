import { NextFunction, Request, Response } from "express";
import { GameInput, GameId } from "../dtos/Game";
import * as JsonApiTypes from "../dtos/JsonApi";
import * as SearchTypes from "../dtos/Search";
import GameService from "../services/GameService";
import Logger from "../services/logger";

const objectTypes = 'games'

interface IPagination {
    number: string;
    size: string;
}

class GameController {
    async create(req: Request, res: Response, next: NextFunction) {
        const requestBody: JsonApiTypes.SingleObjectBody = req.body;
        const gameInput: GameInput = requestBody.attributes as GameInput;
        const [gameId, game] = await GameService.create(gameInput);
        // const gameOutput: GameOutput = game as GameOutput;
        const objectData: JsonApiTypes.SingleObjectData = {
            type: objectTypes as JsonApiTypes.ObjectType,
            id: gameId,
            attributes: game,
        };

        const SingleObjectResponse: JsonApiTypes.SingleObjectResponse = {
            data: objectData,
        }
        // const gameOutput: GameOutput = await GameService.create(gameInput);
        res.status(201).json(SingleObjectResponse);
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as GameId;
        const [gameId, game] = await GameService.findById(id);

        const objectData: JsonApiTypes.SingleObjectData = {
            type: objectTypes as JsonApiTypes.ObjectType,
            id: gameId,
            attributes: game,
        };
        const SingleObjectResponse: JsonApiTypes.SingleObjectResponse = {
            data: objectData,
        }
        res.status(200).json(SingleObjectResponse);
    }

    async search(req: Request, res: Response, next: NextFunction) {
        Logger.info(`query: ${req.query}`);
        const filter = req.query.filter as unknown as SearchTypes.Filter[];
        const pageObj = req.query.page ;
        let pageNumber = undefined;
        let pageSize = undefined;
        // Extract the page number and page size from the ParsedQs object
        if (pageObj) {
            const pagination = pageObj as unknown as IPagination;
            pageNumber = parseInt(pagination.number) as SearchTypes.PageNumber;
            pageSize = parseInt(pagination.size) as SearchTypes.PageNumber;
        }

        const sort = req.query.sort as SearchTypes.Sort[];
        const games = await GameService.search(filter, pageNumber, pageSize, sort);
        // const objectData: JsonApiTypes.MultipleObjectData = {
        //     type: objectTypes as JsonApiTypes.ObjectType,
        //     attributes: games,
        // };
        // const MultipleObjectResponse: JsonApiTypes.MultipleObjectResponse = {
        //     data: [objectData],
        // }
        res.status(200).json({});
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as GameId;
        const requestBody: JsonApiTypes.SingleObjectBody = req.body;
        const gameInput: GameInput = requestBody.attributes as GameInput;
        const [gameId, game] = await GameService.update(id, gameInput);
        const objectData: JsonApiTypes.SingleObjectData = {
            type: objectTypes as JsonApiTypes.ObjectType,
            id: gameId,
            attributes: game,
        };
        const SingleObjectResponse: JsonApiTypes.SingleObjectResponse = {
            data: objectData,
        }
        res.status(200).json(SingleObjectResponse);
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as GameId;
        await GameService.delete(id);
        res.status(204).json();
    }

}

export default new GameController();
