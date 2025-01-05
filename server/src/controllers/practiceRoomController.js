import PracticeRoom from '../models/practiceRoomModel.js';
import Booking from '../models/practiceRoomBookingModel.js';
import { isBefore, isAfter, addHours } from "date-fns"
import RentInstrument from '../models/rentInstrumentModel.js';
import Artist from '../models/artistModel.js';
import validators from '../helpers/validators.js';
import { z } from 'zod';

async function machRoom(startDate, endDate, isVIP, participantsCount) {
  try {
    // מדיקת חדרים תפוסים בטווח התאריכים
    const bookedRooms = await Booking.distinct('roomNumber', {
      $or: [
        {
          startTime: { $lte: endDate },
          endTime: { $gte: startDate }
        }
      ]
    });

    // מצא חדר פנוי שמתאים לדרישות
    const availableRoom = await PracticeRoom.findOne({
      isVIP: isVIP,
      capacity: { $gte: participantsCount },
      roomNumber: { $nin: bookedRooms }
    });

    if (!availableRoom) {
      throw new Error('אין חדרים פנויים שמתאימים לדרישות שלך');
    }

    return {
      roomNumber: availableRoom.roomNumber,
      capacity: availableRoom.capacity,
      isVIP: availableRoom.isVIP,
      pricePerHour: availableRoom.pricePerHour
    };
  } catch (error) {
    throw new Error(`שגיאה בקביעת חדר: ${error.message}`);
  }
}

// Create a new booking

const schema = z.object({
    participantsCount: validators.smallNumber,
    instruments: z.array(validators.id),
    artists: z.array(validators.id),
    startDate: validators.date,
    howLong: validators.smallNumber,
    isVIP: validators.boolean,
});

export const createBooking = async (req, res) => {

    try {
        const requestData = schema.parse(req.body);
        
        const endDate = addHours(requestData.startDate, requestData.howLong)

        const room = await machRoom(requestData.startDate, requestData.endDate, requestData.isVIP, requestData.participantsCount)

        for(const artist of requestData.artists){
            const existingArtist = await Artist.findById(artist)
            if (!existingArtist) return res.status(404).json({ message: 'Artist not found' });
        }

        for (const [index, item] of requestData.instruments.entries()) {
            const instrument = await RentInstrument.findById(item.id)
            if (!instrument) return res.status(404).json({ message: 'Instrument not found' });
            if (item.quantity > instrument.stock) return res.status(400).json({ message: 'Not a valid quantity' })
            requestData.instruments[index].instrumentStock = instrument.stock
            totalPrice += instrument.price * item.quantity
        }

        for (const item of requestData.instruments) {
            await RentInstrument.findOneAndUpdate({ id: item.id }, { stock: item.instrumentStock - item.quantity })
        }

        console.log("room number", room.roomNumber);
        console.log("room", room);

        const booking = new Booking({
            roomNumber: room.roomNumber,
            participants: requestData.participantsCount,
            instruments:requestData.instruments,
            startTime: requestData.startDate,
            endTime: endDate,
            userId: req.user.id,
            artists: requestData.artists,

        });

        await booking.save();

        res.status(201).json({
            message: "ההזמנה נוצרה בהצלחה",
            booking
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }
}

async function machRoom(startDate, endDate, isVIP, participantsCount) {
    const allRooms = await PracticeRoom.find({})
    const allBookings = await Booking.find({})
    let availableRooms = allRooms
    //
    availableRooms = availableRooms.filter((room) => room.isVIP === isVIP)
    console.log("After isVIP", availableRooms);
    if (!availableRooms.length) throw new Error("No rooms match isVIP check")
    availableRooms = availableRooms.filter((room) => room.capacity >= participantsCount)
    console.log("After participantsCount", availableRooms);
    if (!availableRooms.length) throw new Error("No rooms match participantsCount check")


    availableRooms = availableRooms.filter((room) => {
        for (const booking of allBookings) {
            if (booking.roomNumber === room.roomNumber) {
                if (isAfter(endDate, booking.startTime) && isBefore(startDate, booking.endTime)) {
                    return false
                }
            }
        }
        return true
    })
    
    if (!availableRooms.length) throw new Error("The requested rooms are booked")
    const room = availableRooms[0] ?? null
    return room
}


//get Unavailable Date 
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
// Orders

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