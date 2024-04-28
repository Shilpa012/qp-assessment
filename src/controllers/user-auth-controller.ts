import { NextFunction, Request, Response, Router } from "express";
import { requestBodyValidator } from "../middlewares/request-body-validator-middleware";
import { userServices } from "../services/user-services";
import { HttpException, httpStatusFlags } from "../middlewares/exception-handler-middleware";
import { compare } from "bcryptjs";
export const userAuthController = Router();


userAuthController.post("/register", requestBodyValidator("createUser"), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userData = request.body;
        const userDetails = await userServices.getUserDetailsByEmail(userData.email);
        if (userDetails) throw new HttpException(400, httpStatusFlags.FAILED, "User already exists.");

        const createdUser = await userServices.createNewUser(userData);
        if (!createdUser) throw new HttpException(400, httpStatusFlags.FAILED, "Unable to create new user.");

        return response.status(201).json({ status: httpStatusFlags.SUCCESS, message: "User created successfully." });
    } catch (error) {
        next(error);
    }
});


userAuthController.post("/login", requestBodyValidator("login"), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userData = request.body;
        const userDetails: any = await userServices.getUserDetailsByEmail(userData.email);
        if (!userDetails) throw new HttpException(400, httpStatusFlags.FAILED, "User email Id not exists.");

        const isPasswordMatching = await compare(
            userData.password,
            userDetails.password
        );

        if (!isPasswordMatching) throw new HttpException(400, httpStatusFlags.FAILED, "Password is not matching");

        const userAuthData = await userServices.userLogin(userDetails);
        return response.status(200).json({
            status: "SUCCESS",
            userAuthData,
            message: "User logged in successfully",
        });
    } catch (error) {
        next(error);
    }
});