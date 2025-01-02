import express from 'express'
import { createBooking, getBookings, getUnavailableDates } from '../controllers/practiceRoomController.js'
import authMiddleware from '../middlewares/authMiddleware.js'


const router = express.Router();

// User routes
router.post('/', authMiddleware, createBooking);
router.get('/getUnavailable', authMiddleware, getUnavailableDates)
//router.delete('/', authMiddleware, deleteBooking);//To do
//router.patch('/', authMiddleware, editBooking);//To do

// Admin routes
//router.post('/bookings', authMiddleware, getBookings);

export default router;
