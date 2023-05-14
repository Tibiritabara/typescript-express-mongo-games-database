import appConfig from "../config/appConfig";
import { Period } from "../dtos/Trend";
import { IQueue } from "../schemas/queue";
import { RedisClient } from "./RedisClient";

interface ITrendService {
    triggerTrendCalculation(payload: Period): Promise<boolean>;
}

class TrendService implements ITrendService {
    private queueClient: IQueue;

    constructor(queueClient: IQueue) {
        this.queueClient = queueClient;
    }

    async triggerTrendCalculation(payload: Period): Promise<boolean> {
        await this.queueClient.send(appConfig.redis.trendsQueue, JSON.stringify({ period: payload }));
        return true;
    }
}

export default new TrendService(new RedisClient());
