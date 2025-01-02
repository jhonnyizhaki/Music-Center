import Booking from '../models/PracticeRoomBookingModel.js';
import Instrument from '../models/instrumentModel.js';

export const createBooking = async (req, res) => {
    try {
        const {
            participants,
            rentInstruments,
            date,
            time,
            howLong,
            isVIP,
        } = req.body;

        // יצירת תאריכי התחלה וסיום
        const startDateTime = new Date(`${date}T${time}`);
        const endDateTime = new Date(startDateTime.getTime() + howLong * 60 * 60 * 1000);

        // בדיקה אם החדר פנוי
        const existingBooking = await Booking.findOne({
            $or: [
                {
                    startTime: { $lt: endDateTime },
                    endTime: { $gt: startDateTime }
                }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({ message: "החדר תפוס בזמן המבוקש" });
        }

        // חישוב מחיר כולל
        let totalPrice = isVIP ? 200 : 100; // מחיר בסיס לשעה
        totalPrice *= howLong; // כפול מספר שעות

        // הוספת מחיר כלי הנגינה
        if (rentInstruments && rentInstruments.length > 0) {
            const instruments = await Instrument.find({
                _id: { $in: rentInstruments }
            });
            
            const instrumentsPrice = instruments.reduce((sum, instrument) => {
                return sum + (instrument.price * howLong);
            }, 0);

            totalPrice += instrumentsPrice;
        }

        // יצירת ההזמנה
        const booking = new Booking({
            userId: req.user._id,
            roomNumber: isVIP ? 1 : 2, // לדוגמה
            participants,
            rentInstruments: rentInstruments.map(id => ({ instrumentId: id })),
            date,
            time,
            startTime: startDateTime,
            endTime: endDateTime,
            isVIP,
            totalPrice
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
        const bookings = await Booking.find({
            endTime: { $gte: new Date() }
        })
        .sort({ startTime: 1 });

        res.json(bookings);
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