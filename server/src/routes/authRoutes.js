import express from "express";
import { register, login, verify } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", authMiddleware, verify);

export default router;


