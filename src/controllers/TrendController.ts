import { NextFunction, Request, Response } from "express";
import TrendService from "../services/TrendService";
import * as TrendTypes from "../dtos/Trend";
import * as JsonApiTypes from "../dtos/JsonApi";

class TrendController {
    async update(req: Request, res: Response, next: NextFunction) {
        const trendingPeriod = req.params.period as TrendTypes.TrendingPeriod;
        const result = await TrendService.triggerTrendCalculation(trendingPeriod);
        const meta: JsonApiTypes.Meta = {
            status: "Job triggered successfully",
        }
        const SingleObjectResponse: JsonApiTypes.SingleObjectResponse = {
            meta: meta,
        }
        res.status(201).json(SingleObjectResponse);
    }
}

export default new TrendController();
