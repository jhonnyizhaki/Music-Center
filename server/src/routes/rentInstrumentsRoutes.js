import express from 'express';
import { authMiddleware, adminAuthenticationMiddleware } from '../middlewares/authMiddleware.js';
import { createRentInstrument } from '../controllers/rentInstrumentController.js';

const router = express.Router();

// router.get('/', getInstruments);
// router.get('/:id', getInstrumentById);
router.post('/', authMiddleware, adminAuthenticationMiddleware, createRentInstrument);
// router.put('/:id', authMiddleware, adminAuthenticationMiddleware, updateInstrument);
// router.delete('/:id', authMiddleware, adminAuthenticationMiddleware, deleteInstrument);

export default router
