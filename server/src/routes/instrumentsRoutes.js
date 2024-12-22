import express from 'express';
import { createInstrument, deleteInstrument, getInstrumentById, getInstruments, updateInstrument } from '../controllers/instrumentController.js';
import { authMiddleware, adminAuthenticationMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getInstruments);
router.get('/:id', getInstrumentById);
router.post('/', authMiddleware, adminAuthenticationMiddleware, createInstrument);
router.put('/:id', authMiddleware, adminAuthenticationMiddleware, updateInstrument);
router.delete('/:id', authMiddleware, adminAuthenticationMiddleware, deleteInstrument);

export default router
