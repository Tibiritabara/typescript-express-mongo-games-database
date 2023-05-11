import GameRepository from '../repositories/GameRepository';
import { GameInput, GameOutput } from '../dtos/Game';
import { Filter, PageNumber, PageSize, Sort } from '../dtos/Search';

interface IGameService {
    create(payload: GameInput): Promise<GameOutput>;
    findById(id: string): Promise<GameOutput>;
    search(
        filter: Filter[], 
        pageNumber: PageNumber, 
        pageSize: PageSize, 
        sort: Sort[],
    ): Promise<GameInput[]>;
    update(id: string, payload: Partial<GameInput>): Promise<GameOutput>;
    delete(id: string): Promise<boolean>;
}

class GameService implements IGameService {
    async create(payload: GameInput): Promise<GameOutput> {
        const game = await GameRepository.create(payload);
        return game;
    }

    async findById(id: string): Promise<GameOutput> {
        const game = await GameRepository.findById(id);
        return game;
    }

    async search(
        filter: Filter[],
        pageNumber: PageNumber,
        pageSize: PageSize,
        sort: Sort[],
    ): Promise<GameInput[]> {
        const games = await GameRepository.search(filter, pageNumber, pageSize, sort);
        return games;
    }

    async update(id: string, payload: Partial<GameInput>): Promise<GameOutput> {
        const game = await GameRepository.update(id, payload);
        return game;
    }

    async delete(id: string): Promise<boolean> {
        const game = await GameRepository.delete(id);
        return game;
    }
}

export default new GameService();
