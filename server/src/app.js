import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import instrumentsRoute from "./routes/instrumentsRoutes.js";
import categoriesRoute from "./routes/categoriesRoutes.js";
import cartRoute from "./routes/cartRoutes.js";
import practiceRoomBookingRoutes from "./routes/practiceRoomBookingRoutes.js";
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
app.use("/cart", cartRoute);
app.use("/booking", practiceRoomBookingRoutes);
app.use('/orders', orderRoutes);
export default app;



// register - POST - auth/register OK
// login - POST - auth/login OK

// get all instruments - GET - /instruments OK
// get instrument by id - GET - /instruments:id OK
// adding a new instrument - POST- /instruments  ?
// edit an instruments - PUT -/instruments:id    ?
// delete an instruments - DELETE - /instruments:id ?

// get all categories - GET - /categories OK
// get category by id - GET - /categories:id ?
// create a new category - POST - /categories ?
// update Category - PUT - /categories:id ?
// delete a category - DELETE - /categories:id ?

// create booking - POST -  /booking ?
// get Unavailable Dates -  /booking/getUnavailable ?

// create a new order - POST - /orders/add ?





