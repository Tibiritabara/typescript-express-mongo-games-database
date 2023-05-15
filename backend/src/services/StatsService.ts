import AppConfig from "../config/AppConfig";
import { Period } from "../dtos/Trend";
import { IQueue } from "../schemas/queue";
import { RedisClient } from "./RedisClient";

interface IStatsService {
    triggerStatsAggregation(payload: Period): Promise<boolean>;
}

class StatsService implements IStatsService {
    private queueClient: IQueue;

    constructor(queueClient: IQueue) {
        this.queueClient = queueClient;
    }

    async triggerStatsAggregation(payload: Period): Promise<boolean> {
        await this.queueClient.send(AppConfig.redis.statsQueue, JSON.stringify({ period: payload }));
        return true;
    }
}

export default new StatsService(new RedisClient());
