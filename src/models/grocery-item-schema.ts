import mongoose, { Schema } from "mongoose";

const groceryItemSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    unit: {
        type: String,
        require: true                // eg. kg, lit, g, dozen, unit for count
    },
    price: {                         // this price will be for 1 quantity of product
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    isDeleted: {
        type: Boolean,
        require: true
    },
    createdAt: {
        type: Date,
        require: true
    },
    updatedAt: {
        type: Date,
        require: true
    },
    deletedAt: {
        type: Date,
        require: true
    }
})

export default mongoose.model("groceryItems", groceryItemSchema);
