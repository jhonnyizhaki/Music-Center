import express from "express";
import { createMessage } from "../controllers/messageController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createMessage);

export default router;
