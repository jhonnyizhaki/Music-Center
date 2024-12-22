import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import instrumentsRoute from "./routes/instrumentsRoute.js";
import categoriesRoute from "./routes/categoriesRoute.js";
import dotenv from "dotenv";

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

export default app;
