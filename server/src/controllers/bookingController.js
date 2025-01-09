import PracticeRoom from "../models/practiceRoomModel.js";
import Booking from "../models/practiceRoomBookingModel.js";
import { addHours } from "date-fns";
import RentInstrument from "../models/rentInstrumentModel.js";
import payment from "../helpers/payment.js";
import { z } from "zod";

async function machRoom(startDate, endDate, isVIP, participantsCount) {
  try {
    const conflictedBookings = await Booking.find({
      startTime: { $lte: endDate },
      endTime: { $gte: startDate },
    });

    const availableRoom = await PracticeRoom.findOne({
      isVIP: isVIP,
      capacity: { $gte: participantsCount },
      roomNumber: { $nin: conflictedBookings },
    });

    if (!availableRoom) {
      console.error("filed to find room", { conflictedBookings }, availableRoom);

      throw new Error("no available rooms");
    }

    return {
      roomNumber: availableRoom.roomNumber,
      capacity: availableRoom.capacity,
      isVIP: availableRoom.isVIP,
      pricePerHour: availableRoom.pricePerHour,
    };
  } catch (error) {
    throw new Error(`no available rooms: ${error.message}`);
  }
}

// Create a new booking
const machRoomSchema = z.object({
  participantsCount: z.number().min(1),
  instruments: z.array(
    z.object({
      id: z.string(),
      artist: z.boolean().default(false),
      quantity: z.number().min(1),
    })
  ),
  startDate: z.string().transform((value) => new Date(value)),
  howLong: z.number().min(1),
  isVIP: z.boolean().default(false),
});

export const createBooking = async (req, res) => {
  try {
    const { howLong, instruments, isVIP, participantsCount, startDate } = machRoomSchema.parse(req.body);

    const endDate = addHours(startDate, howLong);

    const room = await machRoom(startDate, endDate, isVIP, participantsCount);
    const instrumentsToInsert = [];

    let totalPrice = room.pricePerHour * howLong;
    for (const item of instruments) {
      const instrument = await RentInstrument.findById(item.id);
      if (!instrument) return res.status(404).json({ message: "Instrument not found" });
      if (item.quantity > instrument.stock) return res.status(400).json({ message: "not a valid quantity" });
      instrumentsToInsert.push({ ...item, stock: instrument.stock });
      totalPrice += instrument.price * item.quantity;
    }

    for (const item of instrumentsToInsert) {
      await RentInstrument.findOneAndUpdate({ id: item.id }, { stock: item.stock - item.quantity });
    }

    const paypalOrder = await payment.createPaypalOrder(req.user.email, totalPrice);

    const booking = new Booking({
      roomNumber: room.roomNumber,
      participants: participantsCount,
      instruments,
      startTime: startDate,
      endTime: endDate,
      userId: req.user.id,
      howLong,
      paypalId: paypalOrder.result.id,
      totalPrice,
    });

    await booking.save();

    res.status(201).json({
      message: "room booked successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "booking failed" });
  }
};

export const getUnavailableDates = async (req, res) => {
  try {
    const existingBookings = await Booking.find({}).select({
      startTime: 1,
      endTime: 1,
      _id: 0,
    });
    res.status(200).json(existingBookings);
  } catch (error) {
    console.error("Error fetching unavailable dates:", error);
    res.status(500).json({ message: "no available dates" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId").sort({ startTime: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "no room available" });
  }
};
