import { NextFunction, Request, Response } from "express";
import { GameInput, GameId } from "../dtos/Game";
import * as JsonApiTypes from "../dtos/JsonApi";
import * as SearchTypes from "../dtos/Search";
import GameService from "../services/GameService";
import { HttpCode } from "../exceptions/AppError";

interface IPagination {
    number: string;
    size: string;
}

const objectTypes = 'games'
const defaultPageSize = 10;
const defaultPageNumber = 1;

class GameController {
    async create(req: Request, res: Response, next: NextFunction) {
        const requestBody: JsonApiTypes.SingleObjectBody = req.body;
        const gameInput: GameInput = requestBody.attributes as GameInput;
        try {
            const [gameId, game] = await GameService.create(gameInput);
            const objectData: JsonApiTypes.SingleObjectData = {
                type: objectTypes as JsonApiTypes.ObjectType,
                id: gameId,
                attributes: game,
            };

            const SingleObjectResponse: JsonApiTypes.SingleObjectResponse = {
                data: objectData,
            }
            res.status(HttpCode.CREATED).json(SingleObjectResponse);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as GameId;
        try {
            const [gameId, game] = await GameService.findById(id);
            const objectData: JsonApiTypes.SingleObjectData = {
                type: objectTypes as JsonApiTypes.ObjectType,
                id: gameId,
                attributes: game,
            };
            const SingleObjectResponse: JsonApiTypes.SingleObjectResponse = {
                data: objectData,
            }
            res.status(HttpCode.OK).json(SingleObjectResponse);
        } catch (error) {
            next(error);
        }

    }

    async search(req: Request, res: Response, next: NextFunction) {
        const filter = req.query.filter as unknown as SearchTypes.Filter[];
        const pageObj = req.query.page ;
        let pageNumber: number | undefined = 1;
        let pageSize: number | undefined = 10;

        // Extract the page number and page size from the ParsedQs object
        if (pageObj) {
            const pagination = pageObj as unknown as IPagination;
            pageNumber = parseInt(pagination.number || defaultPageNumber.toString()) as SearchTypes.PageNumber;
            pageSize = parseInt(pagination.size || defaultPageSize.toString()) as SearchTypes.PageNumber;
        }

        const sort = req.query.sort as SearchTypes.Sort[];

        try {
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

            res.status(HttpCode.OK).json(multipleObjectResponse);
        } catch (error) {
            next(error);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as GameId;
        const operations = req.body as JsonApiTypes.JsonPatch;	
        try {
            const [gameId, game] = await GameService.patch(id, operations);
            const objectData: JsonApiTypes.SingleObjectData = {
                type: objectTypes as JsonApiTypes.ObjectType,
                id: gameId,
                attributes: game,
            };
            const SingleObjectResponse: JsonApiTypes.SingleObjectResponse = {
                data: objectData,
            }
            res.status(HttpCode.OK).json(SingleObjectResponse);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as GameId;
        const requestBody: JsonApiTypes.SingleObjectBody = req.body;
        const gameInput: GameInput = requestBody.attributes as GameInput;
        try {
            const [gameId, game] = await GameService.update(id, gameInput);
            const objectData: JsonApiTypes.SingleObjectData = {
                type: objectTypes as JsonApiTypes.ObjectType,
                id: gameId,
                attributes: game,
            };
            const SingleObjectResponse: JsonApiTypes.SingleObjectResponse = {
                data: objectData,
            }
            res.status(HttpCode.OK).json(SingleObjectResponse);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as GameId;
        try {
            await GameService.delete(id);
            res.status(HttpCode.NO_CONTENT).json();
        } catch (error) {
            next(error);
        }
    }

}

export default new GameController();
