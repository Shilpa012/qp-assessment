import mongoose, { Schema, Types } from "mongoose";

const ItemsCollection = new Schema({
    _id: {
        type: Types.ObjectId,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    unit: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
})

const customerAddressSchema = new Schema({
    address: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    zipcode: {
        type: String,
        require: true,
    },
});

const orderSchema = new Schema({
    orderId: {
        type: String,
        require: true,
    },
    customerName: {
        type: String,
        require: true,
    },
    customerEmail: {
        type: String,
        require: true,
    },
    currency: {
        type: String,
        require: true,
    },
    customerAddress: customerAddressSchema,
    items: [ItemsCollection],
    orderStatus: {         // pending ------------ when order is created but payment not completed
        type: String,      // confirmed ---------- when order is created and payment is completed
        require: true      // delivered ---------- when order is successfully delivered
    },
    paymentStatus: {
        type: String,      // pending ------------ payment not completed
        require: true      // completed ---------- payment is completed
    },
    totalDiscounts: {
        type: Number,
        require: true,
    },
    subtotalPrice: {
        type: Number,
        require: true,
    },
    totalPrice: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        require: true
    },
    updatedAt: {
        type: Date,
        require: true
    }
})

export default mongoose.model("orders", orderSchema);
