import express from "express";
import { getPopularProducts } from "../controllers/popularController.js";

const router = express.Router();

router.get("/popular-products", getPopularProducts);

export default router;
