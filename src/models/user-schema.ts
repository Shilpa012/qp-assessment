import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
        require: false
    },
    registeredAt: {
        type: Date,
        require: true
    },
    lastLoggedInAt: {
        type: Date,
        require: true
    }
})

export default mongoose.model("users", userSchema);
