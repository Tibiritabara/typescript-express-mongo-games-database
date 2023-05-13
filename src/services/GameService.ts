import GameRepository from '../repositories/GameRepository';
import { GameInput, GameOutput, GameId } from '../dtos/Game';
import { Filter, PageNumber, PageSize, Sort } from '../dtos/Search';
import Logger from './logger';
import { stringify } from 'querystring';
import * as JsonApiTypes from "../dtos/JsonApi";
import { Operation, applyPatch } from 'json-joy/lib/json-patch';
import { ApplyPatchOptions } from 'json-joy/lib/json-patch/applyPatch/types';

interface IGameService {
    create(payload: GameInput): Promise<[GameId, GameOutput]>;
    findById(id: string): Promise<[GameId, GameOutput]>;
    search(
        filter: Filter[], 
        pageNumber: PageNumber, 
        pageSize: PageSize, 
        sort: Sort[],
    ): Promise<[number, GameId[], GameOutput[]]>;
    update(id: string, payload: Partial<GameInput>): Promise<[GameId, GameOutput]>;
    delete(id: string): Promise<boolean>;
    patch(id: string, payload: JsonApiTypes.JsonPatchOperation[]): Promise<[GameId, GameOutput]>;
}

class GameService implements IGameService {
    async create(payload: GameInput): Promise<[GameId, GameOutput]> {
        const [gameId, game] = await GameRepository.create(payload);
        return [gameId as GameId, game as GameOutput];
    }

    async findById(id: string): Promise<[GameId, GameOutput]> {
        const [gameId, game] = await GameRepository.findById(id);
        return [gameId as GameId, game as GameOutput];
    }

    async search(
        filter: Filter[],
        pageNumber: PageNumber,
        pageSize: PageSize,
        sort: Sort[],
    ): Promise<[number, GameId[], GameOutput[]]> {
        const [gameCount, gameIds, games] = await GameRepository.search(filter, pageNumber, pageSize, sort);
        return [
            gameCount,
            gameIds as GameId[], 
            games as unknown as GameOutput[]
        ];
    }

    async update(id: string, payload: Partial<GameInput>): Promise<[GameId, GameOutput]> {
        const [gameId, game]= await GameRepository.update(id, payload);
        return [gameId as GameId, game as GameOutput];
    }

    async delete(id: string): Promise<boolean> {
        const game = await GameRepository.delete(id);
        return game;
    }

    async patch(id: string, payload: JsonApiTypes.JsonPatchOperation[]): Promise<[GameId, GameOutput]> {
        const [_, game] = await GameRepository.findById(id);
        const gameUpdate = applyPatch(game, payload as Operation[], {} as ApplyPatchOptions);
        const [gameId, updatedGame] = await GameRepository.update(id, gameUpdate.doc as Partial<GameInput>);        
        return [gameId as GameId, updatedGame as GameOutput];
    }
}

export default new GameService();
