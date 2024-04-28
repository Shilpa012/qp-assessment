import { HttpException, httpStatusFlags } from "../middlewares/exception-handler-middleware";
import groceryItemSchema from "../models/grocery-item-schema";

class GroceryServices {
    public getGroceryItemByName = async (name: string) => {
        try {
            const groceryDetails = await groceryItemSchema.findOne({ name });
            return groceryDetails;
        } catch (error) {
            console.log(error);
            throw new HttpException(400, httpStatusFlags.FAILED, "Grocery Item not found");
        }
    }

    public getGroceryItemById = async (groceryItemId: string) => {
        try {
            const groceryDetails = await groceryItemSchema.findById(groceryItemId);
            return groceryDetails;
        } catch (error) {
            console.log(error);
            throw new HttpException(400, httpStatusFlags.FAILED, "Grocery Item not found");
        }
    }

    public createNewGroceryItem = async (groceryData: any) => {
        try {
            const createGroceryData = await groceryItemSchema.create({
                ...groceryData,
                isDeleted: false,
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return createGroceryData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    public getAllGroceryItems = async () => {
        try {
            const groceryList = await groceryItemSchema.find();
            return groceryList;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public getActiveGroceryItems = async () => {
        try {
            const groceryList = await groceryItemSchema.find({isDeleted: false});
            return groceryList;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public updateGroceryItemDetails = async (groceryItemId: string, groceryDetails: any) => {
        try {
            const updatedGroceryItem = await groceryItemSchema.findByIdAndUpdate(groceryItemId, groceryDetails, { new: true });
            return updatedGroceryItem;
        } catch (error) {
            console.log(error);
            throw new HttpException(400, httpStatusFlags.FAILED, "Grocery Item not found");
        }
    }

    public editGroceryItemInventory = async (groceryItemList: any[]) => {
        try {
            for (const groceryItem of groceryItemList) {
                await groceryItemSchema.findByIdAndUpdate(groceryItem._id, { $inc: { quantity: -groceryItem.quantity } });
            }
        } catch (error) {
            console.log(error);
            throw new HttpException(400, httpStatusFlags.FAILED, "Unable to edit grocery item inventory");
        }
    }

    public deleteGroceryItem = async (groceryItemId: string) => {
        try {
            const deletedItem = await groceryItemSchema.findByIdAndUpdate(groceryItemId, { isDeleted: true, deletedAt: new Date() }, { new: true });
            return deletedItem;
        } catch (error) {
            console.log(error);
            throw new HttpException(400, httpStatusFlags.FAILED, "Grocery Item not found");
        }
    }
}

export const groceryServices = new GroceryServices();