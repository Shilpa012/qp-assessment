import { NextFunction, Request, Response, Router } from "express";
import { HttpException, httpStatusFlags } from "../middlewares/exception-handler-middleware";
import { groceryServices } from "../services/grocery-services";
import { UserAuthMiddleWare } from "../middlewares/auth-middleware";
import { orderServices } from "../services/order-services";
import { requestBodyValidator } from "../middlewares/request-body-validator-middleware";

export const userGroceryController = Router();

userGroceryController.post("/create-order", [UserAuthMiddleWare, requestBodyValidator("createOrder")], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { groceryItemList, deliveryAddress, customerDetails } = request.body;
        let totalDiscount: number = 0;
        let subTotalPrice: number = 0;

        for (const groceryItem of groceryItemList) {
            const groceryDetails: any = await groceryServices.getGroceryItemById(groceryItem._id);
            if (!groceryDetails) {
                throw new HttpException(400, httpStatusFlags.FAILED, "Grocery Item not exists.");
            }

            if (groceryItem.price !== groceryDetails.price) {
                throw new HttpException(400, httpStatusFlags.FAILED, `Price of 1 ${groceryDetails.unit} ${groceryDetails.name} is ${groceryDetails.price}, not ${groceryItem.price}`);
            }

            if (groceryItem.quantity > groceryDetails.quantity) {
                throw new HttpException(400, httpStatusFlags.FAILED, `You can order only ${groceryDetails.quantity} ${groceryDetails.unit} ${groceryDetails.name}`);
            }

            subTotalPrice += groceryItem.price * groceryItem.quantity;
        }

        const { paymentDetails, createdOrder }: any = await orderServices.createOrder(groceryItemList, customerDetails, deliveryAddress, totalDiscount, subTotalPrice);
        if (createdOrder){
            await groceryServices.editGroceryItemInventory(groceryItemList);
        }

        if (paymentDetails.data.data.paymentStatus === "Completed") {
            await orderServices.updatePaymentAndOrderStatus(paymentDetails.data.data.orderId);
        }

        return response.status(200).json({ status: httpStatusFlags.SUCCESS, message: "Order created successfully." });
    } catch (error) {
        next(error);
    }
});

userGroceryController.get("/list", UserAuthMiddleWare, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const groceryItems = await groceryServices.getActiveGroceryItems();
        return response.status(200).json({ data: groceryItems, status: httpStatusFlags.SUCCESS, message: "Grocery Items fetched successfully." });
    } catch (error) {
        next(error);
    }
});

userGroceryController.post("/verify-payment-webhook", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Assuming that we have received the payment successfully
        const paymentDetails = {
            orderId: request.body.orderId,
            paymentStatus: "Completed",
            paymentMode: "QR"
        };
        return response.status(200).json({ data: paymentDetails, status: httpStatusFlags.FAILED, message: "Payment Completed." });
    } catch (error) {
        next(error);
    }
});