import express from "express";
import {
  authMiddleware,
  adminAuthenticationMiddleware,
} from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, adminAuthenticationMiddleware, getAllUsers);

export default router;
