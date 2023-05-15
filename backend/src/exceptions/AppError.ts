import * as JsonApiTypes from "../dtos/JsonApi";


export enum HttpCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    PRECONDITION_FAILED = 412,
    INTERNAL_SERVER_ERROR = 500,
  }
  
export class AppError extends Error {
    public readonly errorDetails: JsonApiTypes.ErrorDetails;

    constructor(errorDetails: JsonApiTypes.ErrorDetails) {
        super(errorDetails.title);
        Object.setPrototypeOf(this, new.target.prototype);
        this.errorDetails = errorDetails;
        Error.captureStackTrace(this);
    }
}
