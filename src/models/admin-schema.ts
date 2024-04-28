import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: String,       // active or inactive   ---- active (currently working)    ---- inactive (left the job)
        require: true,
        default: 'active'
    },
    registeredAt: {
        type: Date,
        require: true
    },
    removedAt: {
        type: Date,
        require: true
    }
})

export default mongoose.model("admins", adminSchema);
