import express from "express";
import authMiddleware, {
  adminAuthenticationMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  createContactMessage,
  getAllMessages,
  updateRead,
} from "../controllers/contactMessageController.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get(
  "/getMessages",
  authMiddleware,
  adminAuthenticationMiddleware,
  getAllMessages
);
router.put(
  "/update-read/:id",
  authMiddleware,
  adminAuthenticationMiddleware,
  updateRead
);

export default router;
