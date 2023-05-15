import { Response } from "express";
import Logger from "../services/logger";
import * as JsonApiTypes from "../dtos/JsonApi";
import { AppError, HttpCode } from "./AppError";

class ErrorHandler {
    public handleError(error: Error | AppError | AppError[], response?: Response): void {
        if (error instanceof Array) {
            this.handleMultipleErrors(error, response);
        }
        else if (error instanceof AppError) {
            this.handleAppError(error, response);
        } else {
            this.handleUnknownError(error, response);
        }
    }

    private handleAppError(error: AppError, response?: Response): void {
        if (response) {
            const errorCode = error.errorDetails.status || HttpCode.INTERNAL_SERVER_ERROR;
            const errorResponse: JsonApiTypes.ErrorResponse = {
                errors: [error.errorDetails],
            }
            response.status(errorCode).json(errorResponse);
        }
        Logger.error(error.errorDetails);
    }

    private handleMultipleErrors(errors: AppError[], response?: Response): void {
        if (response) {
            const errorCode = errors[0].errorDetails.status || HttpCode.INTERNAL_SERVER_ERROR;
            const errorResponse: JsonApiTypes.ErrorResponse = {
                errors: errors.map((error) => error.errorDetails),   
            }
            response.status(errorCode).json(errorResponse);
        }
        Logger.error(errors);
    }

    private handleUnknownError(error: Error, response?: Response): void {
        const errorDetails: JsonApiTypes.ErrorDetails = {
            status: HttpCode.INTERNAL_SERVER_ERROR,
            title: "INTERNAL_SERVER_ERROR",
            detail: error.message,
        };
        const errorResponse: JsonApiTypes.ErrorResponse = {
            errors: [errorDetails],   
        }

        if (response) {
            response.status(errorDetails.status || HttpCode.INTERNAL_SERVER_ERROR).json(errorResponse);
        }
        Logger.error(errorDetails);
    }
}

export const errorHandler = new ErrorHandler();
