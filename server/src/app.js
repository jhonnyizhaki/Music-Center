import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import instrumentsRoute from "./routes/instrumentsRoutes.js";
import categoriesRoute from "./routes/categoriesRoutes.js";
import practisRoomBookingRoutes from "./routes/practisRoomBookingRoutes.js";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true

}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/instruments", instrumentsRoute);
app.use("/categories", categoriesRoute);
app.use("/booking", practisRoomBookingRoutes);
app.use('/orders', orderRoutes);
export default app;

// /booking/