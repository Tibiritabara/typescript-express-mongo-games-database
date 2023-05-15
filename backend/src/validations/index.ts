import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, FieldValidationError } from 'express-validator';
import requirements from './requirements';
import Logger from '../services/logger';
import { HttpCode } from '../exceptions/AppError';
import * as JsonApiTypes from "../dtos/JsonApi";


export const Requirements = requirements;

export const Validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const errorDetails: JsonApiTypes.ErrorDetails[] = errors.array().map((error) => {
            const errorDetails = error as FieldValidationError 
            return {
                title:`INVALID_${errorDetails.type.toUpperCase()}`,
                message: errorDetails.msg,
                source: {
                    pointer: `/${errorDetails.path.replace(/\./g, '/')}`
                },
                status: HttpCode.BAD_REQUEST,
            };
        });

        const errorResponse: JsonApiTypes.ErrorResponse = {
            errors: errorDetails,   
        }

        res.status(HttpCode.BAD_REQUEST).json(errorResponse);
    };
}
