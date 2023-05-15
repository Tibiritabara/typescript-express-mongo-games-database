import AppConfig from "../config/AppConfig";
import { IQueue } from "../schemas/queue";
import { RedisClientType, createClient } from 'redis';

export class RedisClient implements IQueue {
    private redisClient: RedisClientType;

    constructor() {
        const url = `redis://${AppConfig.redis.host}:${AppConfig.redis.port}`
        this.redisClient = createClient({
            url: url,
        });
    }

    async send(queue: string, message: string): Promise<void> {
        await this.redisClient.connect();
        await this.redisClient.publish(queue, message);
        await this.redisClient.disconnect();
    }
}
