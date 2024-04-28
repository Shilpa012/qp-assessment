import { NextFunction, Request, Response } from "express";
import { HttpException, httpStatusFlags } from "./exception-handler-middleware";
import { userServices } from "../services/user-services";
import { adminServices } from "../services/admin-services";

export const UserAuthMiddleWare = async (request: any, response: Response, next: NextFunction) => {
    try {
        const jwt = request.headers.authorization?.split(' ')[1];
        if (!jwt) {
            throw new HttpException(400, httpStatusFlags.FAILED, "Authorization Token Required.");
        }
        const jwtResponse = await userServices.verifyUserJWT(jwt);
        if (!jwtResponse) {
            throw new HttpException(400, httpStatusFlags.FAILED, "Wrong Authorization Token.");
        }
        request.user = jwtResponse;
        next();
    } catch (error) {
        next(error);
    }
}

export const AdminAuthMiddleWare = async (request: any, response: Response, next: NextFunction) => {
    try {
        const jwt = request.headers.authorization?.split(' ')[1];
        if (!jwt) {
            throw new HttpException(400, httpStatusFlags.FAILED, "Authorization Token Required.");
        }
        const jwtResponse = await adminServices.verifyAdminJWT(jwt);
        if (!jwtResponse) {
            throw new HttpException(400, httpStatusFlags.FAILED, "Wrong Authorization Token.");
        }
        request.user = jwtResponse;
        next();
    } catch (error) {
        next(error);
    }
}