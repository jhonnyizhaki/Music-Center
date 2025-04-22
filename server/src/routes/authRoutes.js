import express from "express";
import { register, login, verify, logout, googleRegister, authWithGoogle, googleLogin } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/register/google", googleRegister);
router.post("/login/google", googleLogin);
router.get("/google", authWithGoogle);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", authMiddleware, verify);

export default router;
