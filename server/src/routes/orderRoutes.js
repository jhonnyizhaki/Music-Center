import express from 'express';
import {
    addOrder,
    updateInstrumentInOrder,
    deleteInstrumentFromOrder,
    getUserOrder
} from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add an order to the card
router.post('/add', authMiddleware, addOrder);
// Get order card
router.get('/:userId', authMiddleware, getUserOrder);

export default router;
