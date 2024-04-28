import { Router } from "express";
import { adminAuthController } from "../controllers/admin-auth-controller";
import { adminGroceryController } from "../controllers/admin-grocery-controller";

export const adminRouter = Router();

adminRouter.use("/auth", adminAuthController);
adminRouter.use("/grocery", adminGroceryController);