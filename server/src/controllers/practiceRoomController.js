import PracticeRoom from '../models/practiceRoomModel.js';
import Booking from '../models/practiceRoomBookingModel.js';
import { isBefore, isAfter, addHours } from "date-fns"
import RentInstrument from '../models/rentInstrumentModel.js';
import Artist from '../models/artistModel.js';
// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { participantsCount, instruments, artists, startDate, howLong, isVIP } = req.body;
        const endDate = addHours(startDate, howLong)

        const room = await machRoom(startDate, endDate, isVIP, participantsCount)

        for(const artist of artists){
            const existingArtist = await Artist.findById(artist)
            if (!artist) return res.status(404).json({ message: 'artist not found' });
        }

        for (const [index, item] of instruments.entries()) {
            const instrument = await RentInstrument.findById(item.id)
            if (!instrument) return res.status(404).json({ message: 'Instrument not found' });
            if (item.quantity > instrument.stock) return res.status(400).json({ message: 'not a valid quantity' })
            instruments[index].instrumentStock = instrument.stock
            totalPrice += instrument.price * item.quantity
        }

        for (const item of instruments) {
            await RentInstrument.findOneAndUpdate({ id: item.id }, { stock: item.instrumentStock - item.quantity })
        }

        console.log("room number", room.roomNumber);
        console.log("room", room);

        const booking = new Booking({
            roomNumber: room.roomNumber,
            participants: participantsCount,
            instruments,
            startTime: startDate,
            endTime: endDate,
            userId: req.user.id,
            howLong,
            artists

        });

        await booking.save();

        res.status(201).json({
            message: "ההזמנה נוצרה בהצלחה",
            booking
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: "אירעה שגיאה ביצירת ההזמנה" });
    }
};

export const getUnavailableDates = async (req, res) => {
    try {
        const existingBookings = await Booking.find({}).select({ startTime: 1, endTime: 1, _id: 0 });
        res.status(200).json(existingBookings);
    } catch (error) {
        console.error('Error fetching unavailable dates:', error);
        res.status(500).json({ message: "אירעה שגיאה בקבלת התאריכים התפוסים" });
    }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('userId')
            .sort({ startTime: -1 });
            
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: "אירעה שגיאה בקבלת ההזמנות" });
    }
};


//need to check