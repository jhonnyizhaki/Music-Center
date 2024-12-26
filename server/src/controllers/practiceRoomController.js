import PracticeRoom from '../models/practiceRoomModel.js';
import Booking from '../models/practiceRoomBookingModel.js';
import { isBefore, isAfter, addHours } from "date-fns"
// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { participantsCount, instruments, startDate, howLong, isVIP } = req.body;
        const endDate = addHours(startDate, howLong)

        const room = await machRoom(startDate, endDate, isVIP, participantsCount)

        console.log("room number", room.roomNumber);
        console.log("room", room);

        const booking = new Booking({
            roomNumber: room.roomNumber,
            participants: participantsCount,
            instruments,
            startTime: startDate,
            endTime: endDate,
            userId: req.user.id,
            howLong

        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
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
    console.log("after isVIP", availableRooms);
    if (!availableRooms.length) throw new Error("no rooms match isVIP check")
    availableRooms = availableRooms.filter((room) => room.capacity >= participantsCount)
    console.log("after participantsCount", availableRooms);
    if (!availableRooms.length) throw new Error("no rooms match participantsCount check")


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
    if (!availableRooms.length) throw new Error("the requested rooms are booked ")
    const room = availableRooms[0] ?? null
    return room
}


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