import appConfig from "../config/appConfig";
import { IQueue } from "../schemas/queue";
import { RedisClientType, createClient } from 'redis';

export class RedisClient implements IQueue {
    private redisClient: RedisClientType;

    constructor() {
        const url = `redis://${appConfig.redis.host}:${appConfig.redis.port}`
        this.redisClient = createClient({
            url: url,
        });
    }

    async send(queue: string, message: string): Promise<void> {
        await this.redisClient.connect();
        await this.redisClient.set(queue, message);
        await this.redisClient.disconnect();
    }
}
