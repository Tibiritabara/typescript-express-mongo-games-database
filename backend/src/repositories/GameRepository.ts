import { Game, IGame } from '../models/Game';
import { GameInput, GameId } from '../dtos/Game';
import { Filter, PageNumber, PageSize, Sort } from '../dtos/Search';
import Logger from '../services/logger';
import { stringify } from 'querystring';

const defaultPageSize = 10;
const defaultPageNumber = 1;

interface IGameRepository {
    create(payload: GameInput): Promise<[GameId, IGame]>;
    findById(id: GameId): Promise<[GameId, IGame]>;
    search(
        filter: Filter[], 
        pageNumber: PageNumber, 
        pageSize: PageSize, 
        sort: Sort[],
    ): Promise<[number, GameId[], IGame[]]>;
    update(id: GameId, payload: GameInput): Promise<[GameId, IGame]>;
    delete(id: GameId): Promise<boolean>;
}

class GameRepository implements IGameRepository {
    // Implement the methods here
    async create(payload: GameInput): Promise<[GameId, IGame]> {
        const game = await Game.create(payload);
        return [game._id.toString(), game.toObject()];
    }
    
    // implement the getGameById method
    async findById(id: GameId): Promise<[GameId, IGame]> {
        const game = await Game.findById(id);
        // Throw an error if the game is not found
        if (!game) {
            throw new Error('Game not found');
        }

        return [game._id.toString(), game.toObject()];
    }

    // implement the getGames method
    async search(
        filter: Filter[], 
        pageNumber: PageNumber, 
        pageSize: PageSize, 
        sort: Sort[],
    ): Promise<[number, GameId[], IGame[]]> {
        const resultsCount = await Game.countDocuments(filter);
        const games = await Game.find(filter)
            .skip((( pageNumber || defaultPageNumber) - 1) * (pageSize || defaultPageSize))
            .limit(pageSize || defaultPageSize)
            .setOptions({ sanitizeFilter: true })
            .exec();
        
        return [
            resultsCount, 
            games.map(game => game._id.toString()), 
            games.map(game => game.toObject()),
        ];
    }

    // implement the updateGame method using mongoose
    async update(id: GameId, payload: Partial<GameInput>): Promise<[GameId, IGame]> {
        const game = await Game.findByIdAndUpdate(id, payload, { new: true });
        // Throw an error if the game is not found
        if (!game) {
            throw new Error('Game not found');
        }
        return [game._id.toString(), game.toObject()];
    }

    // implement the deleteGame method using mongoose
    async delete(id: GameId): Promise<boolean> {
        const result = await Game.findByIdAndDelete(id);
        return result !== null;
    }
}

export default new GameRepository();
