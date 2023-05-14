import { NextFunction, Request, Response } from "express";
import TrendService from "../services/TrendService";
import * as TrendTypes from "../dtos/Trend";
import * as JsonApiTypes from "../dtos/JsonApi";

class TrendController {
    async update(req: Request, res: Response, next: NextFunction) {
        const period = req.params.period as TrendTypes.Period;
        const result = await TrendService.triggerTrendCalculation(period);
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
