export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: string);
    abstract toApiErrors(): {
        message: string;
        field?: string;
    }[];
}
