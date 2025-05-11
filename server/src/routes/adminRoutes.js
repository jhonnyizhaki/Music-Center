import express from "express";
import {
  authMiddleware,
  adminAuthenticationMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  getStats,
  updateUserRole,
  getAllRooms,
  deleteUser,
  createRoom,
  updateRoom,
  deleteRoom,
  deleteBooking,
} from "../controllers/adminController.js";
import { getAllBookings } from "../controllers/bookingController.js";

const router = express.Router();

// Stats routes
router.get("/stats", authMiddleware, adminAuthenticationMiddleware, getStats);

// User management routes
router.put(
  "/updateUserRole",
  authMiddleware,
  adminAuthenticationMiddleware,
  updateUserRole
);
router.delete(
  "/deleteUser/:id",
  authMiddleware,
  adminAuthenticationMiddleware,
  deleteUser
);

// Room management routes
router.get(
  "/rooms",
  authMiddleware,
  adminAuthenticationMiddleware,
  getAllRooms
);
router.post(
  "/rooms",
  authMiddleware,
  adminAuthenticationMiddleware,
  createRoom
);
router.put(
  "/rooms/:id",
  authMiddleware,
  adminAuthenticationMiddleware,
  updateRoom
);
router.delete(
  "/rooms/:id",
  authMiddleware,
  adminAuthenticationMiddleware,
  deleteRoom
);

router.delete(
  "/booking/:id",
  authMiddleware,
  adminAuthenticationMiddleware,
  deleteBooking
);

router.get(
  "/bookings/getBookings",
  authMiddleware,
  adminAuthenticationMiddleware,
  getAllBookings
);

export default router;
