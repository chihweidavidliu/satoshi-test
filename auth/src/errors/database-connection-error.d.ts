import { CustomError } from "./custom-error";
export declare class DatabaseConnectionError extends CustomError {
    message: string;
    statusCode: number;
    constructor();
    toApiErrors(): {
        message: string;
    }[];
}
