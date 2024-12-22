import express from 'express';
import {
    addOrder,
    updateInstrumentInOrder,
    deleteInstrumentFromOrder,
    getUserOrder
} from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add an instrument to the card
router.post('/add',
    // authMiddleware, 
    addOrder);

// Update an instrument's quantity in the card
router.put('/update', authMiddleware, updateInstrumentInOrder);

// Delete an instrument from the card
router.delete('/delete', authMiddleware, deleteInstrumentFromOrder);

// Get user's card
router.get('/:userId', authMiddleware, getUserOrder);

export default router;
