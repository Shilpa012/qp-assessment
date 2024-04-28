import { Router } from "express";
import { userAuthController } from "../controllers/user-auth-controller";
import { userGroceryController } from "../controllers/user-grocery-controller";

export const userRouter = Router();

userRouter.use("/auth", userAuthController);
userRouter.use("/grocery", userGroceryController);
