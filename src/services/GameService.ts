import GameRepository from '../repositories/GameRepository';
import { GameInput, GameOutput, GameId } from '../dtos/Game';
import { Filter, PageNumber, PageSize, Sort } from '../dtos/Search';
import Logger from './logger';
import { stringify } from 'querystring';

interface IGameService {
    create(payload: GameInput): Promise<[GameId, GameOutput]>;
    findById(id: string): Promise<[GameId, GameOutput]>;
    search(
        filter: Filter[], 
        pageNumber: PageNumber, 
        pageSize: PageSize, 
        sort: Sort[],
    ): Promise<GameInput[]>;
    update(id: string, payload: Partial<GameInput>): Promise<[GameId, GameOutput]>;
    delete(id: string): Promise<boolean>;
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
    ): Promise<GameInput[]> {
        const games = await GameRepository.search(filter, pageNumber, pageSize, sort);
        return games as GameOutput[];
    }

    async update(id: string, payload: Partial<GameInput>): Promise<[GameId, GameOutput]> {
        const [gameId, game]= await GameRepository.update(id, payload);
        return [gameId as GameId, game as GameOutput];
    }

    async delete(id: string): Promise<boolean> {
        const game = await GameRepository.delete(id);
        return game;
    }
}

export default new GameService();
