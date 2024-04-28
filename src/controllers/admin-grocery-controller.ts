import { NextFunction, Request, Response, Router } from "express";
import { requestBodyValidator } from "../middlewares/request-body-validator-middleware";
import { HttpException, httpStatusFlags } from "../middlewares/exception-handler-middleware";
import { groceryServices } from "../services/grocery-services";
import { AdminAuthMiddleWare } from "../middlewares/auth-middleware";
export const adminGroceryController = Router();

adminGroceryController.post("/create", [AdminAuthMiddleWare, requestBodyValidator("createGroceryItem")], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const groceryData = request.body;
        const groceryDetails = await groceryServices.getGroceryItemByName(groceryData.name);
        if (groceryDetails) throw new HttpException(400, httpStatusFlags.FAILED, "Grocery Item already exists.");

        const createdAdmin = await groceryServices.createNewGroceryItem(groceryData);
        if (!createdAdmin) throw new HttpException(400, httpStatusFlags.FAILED, "Unable to create new grocery item.");

        return response.status(201).json({ status: httpStatusFlags.SUCCESS, message: "Grocery Item created successfully." });
    } catch (error) {
        next(error);
    }
});

adminGroceryController.get("/list", AdminAuthMiddleWare, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const groceryItems = await groceryServices.getAllGroceryItems();
        return response.status(200).json({ data: groceryItems, status: httpStatusFlags.SUCCESS, message: "Grocery Items fetched successfully." });
    } catch (error) {
        next(error);
    }
});

adminGroceryController.post("/update", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { groceryItemId, groceryData } = request.body;
        const groceryDetails = await groceryServices.updateGroceryItemDetails(groceryItemId, groceryData);
        if (!groceryDetails) throw new HttpException(400, httpStatusFlags.FAILED, "Grocery Item details not updated.");
        return response.status(200).json({ data: groceryDetails, status: httpStatusFlags.FAILED, message: "Grocery Items updated successfully." });
    } catch (error) {
        next(error);
    }
});

adminGroceryController.post("/delete", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { groceryItemId } = request.body;
        const groceryDetails = await groceryServices.deleteGroceryItem(groceryItemId);
        if (!groceryDetails) throw new HttpException(400, httpStatusFlags.FAILED, "Grocery Item details not deleted.");
        return response.status(200).json({ data: groceryDetails, status: httpStatusFlags.FAILED, message: "Grocery Items deleted successfully." });
    } catch (error) {
        next(error);
    }
});
