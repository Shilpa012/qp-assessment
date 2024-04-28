import { v4 } from "uuid";
import axios from "axios";
import orderSchema from "../models/order-schema";
import { HttpException, httpStatusFlags } from "../middlewares/exception-handler-middleware";
import { Types } from "mongoose";

class OrderServices {
    public createOrder = async (groceryItemsList: Object[], customerDetails: any, delivaryAddress: any, totalDiscounts: number, subtotalPrice: number) => {
        try {
            const orderId = v4();
            const orderToBeCreated = {
                orderId,
                customerName: customerDetails.firstName + " " + customerDetails.lastName,
                customerEmail: customerDetails.email,
                currency: "INR",
                customerAddress: delivaryAddress,
                items: groceryItemsList.map((element: any) => { return { ...element, _id: new Types.ObjectId(element._id) } }),
                orderStatus: 'pending',
                paymentStatus: 'pending',
                totalDiscounts,
                subtotalPrice,
                totalPrice: subtotalPrice - totalDiscounts,
                createdAt: new Date()
            }

            const createdOrder = await orderSchema.create(orderToBeCreated);
            if (!createdOrder) return new HttpException(400, httpStatusFlags.FAILED, "Order Creation failed");

            // As it is not mentioned to use any payment webhook, 
            // here I am calling dummy api instead of payment webhook which will confirm the booking once payment is received
            const paymentDetails = await axios.post("http://localhost:4001/user/grocery/verify-payment-webhook", {
                orderId
            });

            return { paymentDetails, createdOrder };
        } catch (error: any) {
            console.log(error.message)
            throw error;
        }
    }


    public updatePaymentAndOrderStatus = async (orderId: string) => {
        try {
            return await orderSchema.findOneAndUpdate({ orderId }, { paymentStatus: "Completed", orderStatus: "Confirmed" });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const orderServices = new OrderServices();
