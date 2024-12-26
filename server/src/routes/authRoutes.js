import express from "express";
import { register, login, verify, logout } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", authMiddleware, verify);

export default router;


