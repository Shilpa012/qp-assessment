import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user-routes.js";
import { adminRouter } from "./routes/admin-routes.js";
import { exceptionHandler } from "./middlewares/exception-handler-middleware.js";

// https://documenter.getpostman.com/view/13870269/2sA3BuVUGf --- this is postman documentation.

dotenv.config();

const app = express();
const { MONGODB_URL, PORT } = process.env;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.use(exceptionHandler);

// Database Connection
const initializeApp = async () => {
    try {
        await mongoose.connect(`${MONGODB_URL}`);
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

initializeApp();