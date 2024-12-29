import express from 'express';
import {
    addOrder,
    updateInstrumentInOrder,
    deleteInstrumentFromOrder,
    getUserOrder,
    approvePayment
} from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add an order to the card
router.post('/add', authMiddleware, addOrder);
router.get('/approvePayment', approvePayment);
// Get order card
router.get('/:userId', authMiddleware, getUserOrder);

export default router;
