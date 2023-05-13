import { Schema, model } from 'mongoose';
import { components } from '../schemas/schema';
import { read } from 'fs';

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
        rank: {
            type: Number,
            default: -1,
        }
    }, 
    {
        toObject: { 
            transform: function (doc, ret) {
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        },
        timestamps: true
    }
);

export { IGame };
export const Game = model<IGame>("Game", gameSchema);
