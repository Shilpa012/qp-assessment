import { NextFunction, Response, Request } from "express";

interface ErrorObject {
    statusCode: number,
    statusFlag: string,
    errorMessage: string,
}

class HttpStatusFlags {
    public FAILED = "FAILED";
    public SUCCESS = "SUCCESS";
    public SERVER_ERROR = "SERVER_ERROR";
}

export const httpStatusFlags: any = new HttpStatusFlags();

export class HttpException {
    statusCode;
    errorMessage;
    statusFlag;

    constructor(statusCode: number, statusFlag: string, errorMessage: string) {
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
        this.statusFlag = statusFlag;
    }
}


export const exceptionHandler = (errorObject: ErrorObject, request: Request, response: Response, next: NextFunction) => {
    try {
        if (errorObject instanceof HttpException) {
            return response.status(errorObject.statusCode).json({ status: errorObject.statusFlag, message: errorObject.errorMessage });
        } else {
            return response.status(500).json({ status: httpStatusFlags.FAILED, message: "Server error. Please contact the vendor." });
        }
    } catch (error) {
        next(error);
    }
}