import express from 'express';
import {
    addOrder,
    updateInstrumentInOrder,
    deleteInstrumentFromOrder,
    getUserOrder,
    approvePayment,
    getOrders,
    deleteOrders
} from '../controllers/orderController.js';
import authMiddleware, { adminAuthenticationMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add an order to the card
router.post('/add', authMiddleware, addOrder);
router.get('/approvePayment', approvePayment);
// Get order card
router.get('/:userId', authMiddleware, getUserOrder);
router.get("/",authMiddleware,adminAuthenticationMiddleware, getOrders)
router.delete("/",authMiddleware, adminAuthenticationMiddleware, deleteOrders)
router.delete("/deleteINstrumentFromOrder",authMiddleware, adminAuthenticationMiddleware, deleteInstrumentFromOrder)

export default router;
