import { Schema, model } from 'mongoose';
import { components } from '../schemas/schema';

type IGame = components['schemas']['Game'];

const gameSchema = new Schema<IGame>({
        title: {
            type: String,
            required: true,
        },
        numberOfLikes: {
            type: Number,
            default: 0,
        },
        numberOfPlayers: {
            type: Number,
            default: 0,
        },
    }, 
    {
        timestamps: true
    }
);

export const Game = model<IGame>("Game", gameSchema);
