import { Request, Response, NextFunction } from "express";
import { createUser } from "../validators/create-user-validator";
import { HttpException, httpStatusFlags } from "./exception-handler-middleware";
import { createAdmin } from "../validators/create-admin-validator";
import { login } from "../validators/login-validator";
import { createGroceryItem } from "../validators/create-grocery-item-validator";
import { createOrder } from "../validators/create-order-validator";

const Validators: Record<string, any> = {
    createUser,
    createAdmin,
    login,
    createGroceryItem,
    createOrder
};

export const requestBodyValidator = (validatorType: string) => {
    return async function (request: Request, response: Response, next: NextFunction) {
        try {
            if (!Validators.hasOwnProperty(validatorType)) {
                throw new HttpException(400, httpStatusFlags.FAILED, `${validatorType} validator does not exist`);
            }
            const validated = await Validators[validatorType].validateAsync(request.body);
            request.body = validated;
            next();
        } catch (error: any) {
            if (error.isJoi) {
                next(new HttpException(400, httpStatusFlags.FAILED, error.details[0].message));
            } else {
                next(error);
            }
        }
    };
};
