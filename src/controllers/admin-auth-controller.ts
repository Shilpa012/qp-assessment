import { NextFunction, Request, Response, Router } from "express";
import { requestBodyValidator } from "../middlewares/request-body-validator-middleware";
import { HttpException, httpStatusFlags } from "../middlewares/exception-handler-middleware";
import { compare } from "bcryptjs";
import { adminServices } from "../services/admin-services";
export const adminAuthController = Router();


adminAuthController.post("/register", requestBodyValidator("createAdmin"), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const adminData = request.body;
        const adminDetails = await adminServices.getAdminDetailsByEmail(adminData.email);
        if (adminDetails) throw new HttpException(400, httpStatusFlags.FAILED, "Admin already exists.");


        const createdAdmin = await adminServices.createNewAdmin(adminData);
        if (!createdAdmin) throw new HttpException(400, httpStatusFlags.FAILED, "Unable to create new admin.");

        return response.status(201).json({ status: httpStatusFlags.SUCCESS, message: "Admin created successfully." });
    } catch (error) {
        next(error);
    }
});


adminAuthController.post("/login", requestBodyValidator("login"), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const adminData = request.body;
        const adminDetails: any = await adminServices.getAdminDetailsByEmail(adminData.email);
        if (!adminDetails) throw new HttpException(400, httpStatusFlags.FAILED, "Admin email Id not exists.");

        const isPasswordMatching = await compare(
            adminData.password,
            adminDetails.password
        );

        if (!isPasswordMatching) throw new HttpException(400, httpStatusFlags.FAILED, "Password is not matching.");

        const adminAuthData = await adminServices.adminLogin(adminDetails);
        return response.status(200).json({
            status: "SUCCESS",
            adminAuthData,
            message: "Admin logged in successfully",
        });
    } catch (error) {
        next(error);
    }
});