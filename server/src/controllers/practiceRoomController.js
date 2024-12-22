import PracticeRoom from '../models/practiceRoomModel.js';
import Booking from '../models/practiceRoomBookingModel.js';

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { participantsCount, instruments, date, howLong } = req.body;




        const booking = new Booking({
            participantsCount,
            instruments,
            date,
            userId: req.user.id,
            howLong
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }
};

//get Unavailable Date 
export const getUnavailableDates = async (req, res) => {
    try {
        const existingBookings = await Booking.find({});
        res.status(200).json(existingBookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all bookings for admin
export const getBookings = async (req, res) => {
    try {
        const bookings = await PracticeRoom.find().populate('userId', 'name email');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
//need to check