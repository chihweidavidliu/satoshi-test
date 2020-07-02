import { CustomError } from "./custom-error";
export declare class BadRequestError extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    toApiErrors(): {
        message: string;
    }[];
}
