import express from "express";
import { approveBooking, createBooking, getBookings, getUnavailableDates } from "../controllers/bookingController.js";
import authMiddleware, { adminAuthenticationMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", authMiddleware, createBooking);
router.get("/getUnavailable", authMiddleware, getUnavailableDates);
router.get("/approveBooking", approveBooking);

//router.delete('/', authMiddleware, deleteBooking);//To do
//router.patch('/', authMiddleware, editBooking);//To do

// Admin routes
router.get("/bookings", authMiddleware, adminAuthenticationMiddleware, getBookings);

export default router;
