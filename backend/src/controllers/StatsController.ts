import { NextFunction, Request, Response } from "express";
import StatsService from "../services/StatsService";
import * as TrendTypes from "../dtos/Trend";
import * as JsonApiTypes from "../dtos/JsonApi";

class StatsController {
    async update(req: Request, res: Response, next: NextFunction) {
        const period = req.params.period as TrendTypes.Period;
        try {
            await StatsService.triggerStatsAggregation(period);
            const meta: JsonApiTypes.Meta = {
                status: "Job triggered successfully",
            }
            const SingleObjectResponse: JsonApiTypes.SingleObjectResponse = {
                meta: meta,
            }
            res.status(201).json(SingleObjectResponse);
        } catch (error) {
            next(error);
        }
    }
}

export default new StatsController();
