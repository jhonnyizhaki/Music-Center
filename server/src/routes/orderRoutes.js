import express from "express";
import {
  crateOrder,
  updateInstrumentInOrder,
  deleteInstrumentFromOrder,
  getUserOrder,
  approveOrder,
  getOrders,
  deleteOrders,
  cancelOrder,
} from "../controllers/orderController.js";
import authMiddleware, {
  adminAuthenticationMiddleware,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add an order to the card
router.post("/add", authMiddleware, crateOrder);
router.get("/approveOrder", approveOrder);
// Get order card
router.get("/:userId", authMiddleware, getUserOrder);
router.get("/", authMiddleware, adminAuthenticationMiddleware, getOrders);
router.delete("/", authMiddleware, adminAuthenticationMiddleware, deleteOrders);
router.put("/updateInstrument", authMiddleware, adminAuthenticationMiddleware, updateInstrumentInOrder);
router.delete("/deleteInstrumentFromOrder", authMiddleware, adminAuthenticationMiddleware, deleteInstrumentFromOrder);
router.get('/cancelOrder',cancelOrder )

export default router;
