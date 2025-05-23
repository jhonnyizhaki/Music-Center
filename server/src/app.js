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
import RentInstrumentRoutes from "./routes/rentInstrumentsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactUsRoutes from "./routes/contactUsRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import messageRoutes from "./routes/messageRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import popularRoutes from "./routes/popularRoutes.js";



dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes

app.use("/auth", authRoutes);
app.use("/instruments", instrumentsRoute);
app.use("/categories", categoriesRoute);
app.use("/cart", cartRoute);
app.use("/bookings", practiceRoomBookingRoutes);
app.use("/orders", orderRoutes);
app.use("/rentInstruments", RentInstrumentRoutes);
app.use("/users", userRoutes);
app.use("/contactUs", contactUsRoutes);
app.use("/admin", adminRoutes);
app.use("/messages", messageRoutes);
app.use("/contact", contactRoutes);
app.use("/", popularRoutes);
app.use("*", errorMiddleware);
export default app;

// register - POST - /auth/register OK
// login - POST - /auth/login OK
// logout - POST - /auth/logout OK
// register - POST - /auth/register OK
// login - POST - /auth/login OK
// logout - POST - /auth/logout OK

// get all instruments - GET - /instruments OK
// get instrument by id - GET - /instruments:id OK
// edit an instruments - PUT -/instruments:id    OK - admin
// adding a new instrument - POST- /instruments OK - admin
// delete an instruments - DELETE - /instruments:id OK - admin
// edit an instruments - PUT -/instruments:id    OK - admin
// adding a new instrument - POST- /instruments OK - admin
// delete an instruments - DELETE - /instruments:id OK - admin

// get all categories - GET - /categories OOK
// get category by id - GET - /categories:id OK
// create a new category - POST - /categories OK - admin
// update Category - PUT - /categories:id OK - admin
// delete a category - DELETE - /categories:id OK - admin

// create booking - POST -  /booking OK
// get Unavailable Dates -  /booking/getUnavailable ?

// create a new order - POST - /orders/add ?
