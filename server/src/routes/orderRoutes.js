import express from "express";
import {
  addOrder,
  updateInstrumentInOrder,
  deleteInstrumentFromOrder,
  getUserOrder,
  approveOrder,
  getOrders,
  deleteOrders,
} from "../controllers/orderController.js";
import authMiddleware, {
  adminAuthenticationMiddleware,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add an order to the card
router.post("/add", authMiddleware, addOrder);
router.get("/approveOrder", approveOrder);
// Get order card
router.get("/:userId", authMiddleware, getUserOrder);
router.get("/", authMiddleware, adminAuthenticationMiddleware, getOrders);
router.delete("/", authMiddleware, adminAuthenticationMiddleware, deleteOrders);
router.put(
  "/updateInstrument",
  authMiddleware,
  adminAuthenticationMiddleware,
  updateInstrumentInOrder
);
router.delete(
  "/deleteINstrumentFromOrder",
  authMiddleware,
  adminAuthenticationMiddleware,
  deleteInstrumentFromOrder
);

export default router;
