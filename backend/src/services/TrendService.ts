import appConfig from "../config/appConfig";
import { TrendingPeriod } from "../dtos/Trend";
import { IQueue } from "../schemas/queue";
import { RedisClient } from "./RedisClient";


interface ITrendService {
    triggerTrendCalculation(payload: TrendingPeriod): Promise<boolean>;
}

class TrendService implements ITrendService {
    private queueClient: IQueue;

    constructor(queueClient: IQueue) {
        this.queueClient = queueClient;
    }

    async triggerTrendCalculation(payload: TrendingPeriod): Promise<boolean> {
        await this.queueClient.send(appConfig.redis.queue, JSON.stringify({ period: payload }));
        return true;
    }
}

export default new TrendService(new RedisClient());
