import { NextFunction, Request, Response } from "express";
import { GameInput, GameId } from "../dtos/Game";
import * as JsonApiTypes from "../dtos/JsonApi";
import * as SearchTypes from "../dtos/Search";
import GameService from "../services/GameService";

const objectTypes = 'games'

interface IPagination {
    number: string;
    size: string;
}

const defaultPageSize = 10;
const defaultPageNumber = 1;

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
        const filter = req.query.filter as unknown as SearchTypes.Filter[];
        const pageObj = req.query.page ;
        let pageNumber = undefined;
        let pageSize = undefined;
        // Extract the page number and page size from the ParsedQs object
        if (pageObj) {
            const pagination = pageObj as unknown as IPagination;
            pageNumber = parseInt(pagination.number || defaultPageNumber.toString()) as SearchTypes.PageNumber;
            pageSize = parseInt(pagination.size || defaultPageSize.toString()) as SearchTypes.PageNumber;
        }

        const sort = req.query.sort as SearchTypes.Sort[];
        const [count, gameIds, games] = await GameService.search(filter, pageNumber, pageSize, sort);
        
        let objectArray: JsonApiTypes.SingleObjectData[] = [];
        for (let i=0; i<games.length; i++) {
            const objectData: JsonApiTypes.SingleObjectData = {
                type: objectTypes as JsonApiTypes.ObjectType,
                id: gameIds[i],
                attributes: games[i],
            };
            objectArray.push(objectData);
        }

        let filterQueryString = ''
        if (filter) {
            filterQueryString = Object.entries(filter).map(([key, value]) => `filter[${key}]=${value}`).join('&');
        }
        
        const nextPage = pageNumber ? (pageNumber + 1) % count + 1 : defaultPageNumber;
        const lastPage = Math.ceil(count / (pageSize ? pageSize : defaultPageSize));

        const links: JsonApiTypes.Links = {
            current: `${req.baseUrl}?page[number]=${pageNumber}&page[size]=${pageSize}&${filterQueryString}`,
            first: `${req.baseUrl}?page[number]=1&page[size]=${pageSize}&${filterQueryString}`,
            next: `${req.baseUrl}?page[number]=${nextPage}&page[size]=${pageSize}&${filterQueryString}`,
            last: `${req.baseUrl}?page[number]=${lastPage}&page[size]=${pageSize}&${filterQueryString}`,
        };

        const meta: JsonApiTypes.Meta = {
            count: count,
        }

        const multipleObjectResponse: JsonApiTypes.MultipleObjectsResponse = {
            data: objectArray,
            links: links,
            meta: meta,
        }

        res.status(200).json(multipleObjectResponse);
    }

    async patch(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as GameId;
        const operations = req.body as JsonApiTypes.JsonPatch;	
        const [gameId, game] = await GameService.patch(id, operations);
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
