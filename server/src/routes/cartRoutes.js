import express from "express";
import { addToCart, getCart, updateCartItemQuantity, removeCartItem, clearCart } from '../controllers/cartController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router();

// Add item to cart
router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addToCart);
router.put("/clear", authMiddleware, clearCart);
router.put("/:instrumentId", authMiddleware, updateCartItemQuantity);
router.delete("/:instrumentId", authMiddleware, removeCartItem);

export default router;


