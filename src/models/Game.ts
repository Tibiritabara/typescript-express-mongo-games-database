import { randomUUID } from 'crypto';
import { Schema, model, connect } from 'mongoose';

interface IGame {
    _id: Schema.Types.UUID;
    title: string;
    numberOfLikes: number;
    numberOfPlayers: number;
    rank: number;
    createdAt: Date;
    updatedAt: Date;
}

const gameSchema = new Schema<IGame>({
    _id: {
        type: Schema.Types.UUID,
        default: () => randomUUID(),
    },
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Game = model<IGame>("Game", gameSchema);
