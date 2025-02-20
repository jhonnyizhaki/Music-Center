import express from "express";
import authMiddleware, { adminAuthenticationMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.post("/", authMiddleware, createMessage);
// router.get("/", authMiddleware, getMyMessages);
// router.get("/allMessages", adminAuthenticationMiddleware, getAllMessages);

export default router;
