import { Game } from '../models/Game';
import { GameInput, GameId, GameOutput } from '../dtos/Game';
import { Filter, PageNumber, PageSize, Sort } from '../dtos/Search';

const defaultPageSize = 10;
const defaultPageNumber = 1;

interface IGameRepository {
    create(payload: GameInput): Promise<[GameId,GameOutput]> ;
    findById(id: GameId): Promise<GameOutput>;
    search(
        filter: Filter[], 
        pageNumber: PageNumber, 
        pageSize: PageSize, 
        sort: Sort[],
    ): Promise<GameInput[]>;
    update(id: GameId, payload: GameInput): Promise<GameOutput>;
    delete(id: GameId): Promise<boolean>;
}

class GameRepository implements IGameRepository {
    // Implement the methods here
    async create(payload: GameInput): Promise<[GameId,GameOutput]> {
        const game = await Game.create(payload);
        return [game.id, game];
    }
    
    // implement the getGameById method
    async findById(id: GameId): Promise<GameOutput> {
        const game = await Game.findById(id);
        // Throw an error if the game is not found
        if (!game) {
            throw new Error('Game not found');
        }
        return game;
    }

    // implement the getGames method
    async search(
        filter: Filter[], 
        pageNumber: PageNumber | 0, 
        pageSize: PageSize, 
        sort: Sort[],
    ): Promise<GameInput[]> {
        
        const games = await Game.find()
            .skip((( pageNumber || defaultPageNumber) - 1) * (pageSize || defaultPageSize))
            .limit(pageSize || defaultPageSize)
            .exec();
            // TODO sorting and filtering are pending
        return games;
    }

    // implement the updateGame method using mongoose
    async update(id: GameId, payload: Partial<GameInput>): Promise<GameOutput> {
        const game = await Game.findByIdAndUpdate(id, payload, { new: true });
        // Throw an error if the game is not found
        if (!game) {
            throw new Error('Game not found');
        }
        return game;
    }

    // implement the deleteGame method using mongoose
    async delete(id: GameId): Promise<boolean> {
        const result = await Game.findByIdAndDelete(id);
        return result !== null;
    }
}

export default new GameRepository();
