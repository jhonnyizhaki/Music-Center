import express from 'express';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/catergoryController.js';
import { adminAuthenticationMiddleware, authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', authMiddleware, adminAuthenticationMiddleware, createCategory);
router.put('/:id', authMiddleware, adminAuthenticationMiddleware, updateCategory);
router.delete('/:id', authMiddleware, adminAuthenticationMiddleware, deleteCategory);

export default router;