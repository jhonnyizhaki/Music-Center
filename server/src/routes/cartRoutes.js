import express from "express";
import { addToCart, getCart, updateCartItemQuantity, removeCartItem, clearCart } from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update/:instrumentId", authMiddleware, updateCartItemQuantity);
router.delete("/remove/:instrumentId", authMiddleware, removeCartItem);
router.put("/clear", authMiddleware, clearCart);

export default router;
