import express from "express";
import { approveBooking, createBooking, getUserBookings, getAllBookings, getUnavailableDates, cancelBooking } from "../controllers/bookingController.js";
import authMiddleware, { adminAuthenticationMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", authMiddleware, createBooking);
router.get("/getUnavailable", authMiddleware, getUnavailableDates);
router.get("/approveBooking", approveBooking);
router.get("/cancelBooking", cancelBooking);
router.get("/admin/getBookings", authMiddleware, adminAuthenticationMiddleware, getBookings);
router.get("/userBookings", authMiddleware, getUserBookings);

//router.delete('/', authMiddleware, deleteBooking);//To do
//router.patch('/', authMiddleware, editBooking);//To do

// Admin routes
router.get("/", authMiddleware, adminAuthenticationMiddleware, getAllBookings);

export default router;
