import PracticeRoom from "../models/practiceRoomModel.js";
import Booking from "../models/practiceRoomBookingModel.js";
import { addHours, isPast } from "date-fns";
import RentInstrument from "../models/rentInstrumentModel.js";
import payment from "../helpers/payment.js";
import { z } from "zod";

async function machRoom(startDate, endDate, isVIP, participantsCount) {
  try {
    // end of existing > start of new && start of existing < end of new
    const conflictedBookings = await Booking.find({
      endTime: { $gte: startDate },
      startTime: { $lte: endDate },
    });

    const availableRoom = await PracticeRoom.findOne({
      //$or: [{ endTime: { $lte: startDate } }, { startTime: { $gte: endDate } }],
      isVIP: isVIP,
      capacity: { $gte: participantsCount },
      roomNumber: { $nin: conflictedBookings.map((room) => room.roomNumber) },
      //roomNumber: { $nin: [2] },
    });

    if (!availableRoom) {
      console.error("all rooms are occupied", availableRoom);

      throw new Error("filed to find room");
    }

    return availableRoom;
  } catch (error) {
    throw new Error(`no available rooms: ${error.message}`);
  }
}

// Create a new booking
const machRoomSchema = z.object({
  participantsCount: z.number().min(1),
  rentInstruments: z
    .array(
      z.object({
        instrumentId: z.string(),
        artist: z.boolean().default(false),
        //quantity: z.number().min(1),
      })
    )
    .optional(),
  startDate: z.string().transform((value) => new Date(value)),
  howLong: z.string().transform((value) => parseInt(value)),
  isVIP: z.boolean().default(false),
});

export const createBooking = async (req, res) => {
  try {
    const { howLong, rentInstruments, isVIP, participantsCount, startDate } = machRoomSchema.parse(req.body);

    if (isPast(startDate)) {
      throw new Error("invalid date");
    }
    const endDate = addHours(startDate, howLong);

    console.log({ startDate, endDate, isVIP, participantsCount });
    const room = await machRoom(startDate, endDate, isVIP, participantsCount);

    const instrumentsToInsert = [];

    let totalPrice = room.pricePerHour * howLong;

    if (rentInstruments)
      for (const item of rentInstruments) {
        const instrument = await RentInstrument.findById(item.instrumentId);
        if (!instrument) return res.status(404).json({ message: "Instrument not found" });
        if (item.quantity > instrument.stock) return res.status(400).json({ message: "not a valid quantity" });
        instrumentsToInsert.push({ ...item, stock: instrument.stock });
        totalPrice += instrument.rentPrice;
      }

    for (const item of instrumentsToInsert) {
      await RentInstrument.findOneAndUpdate({ id: item.instrumentId }, { stock: item.stock - 1 });
    }

    const ms = new Date(startDate);
    const me = new Date(endDate);
    const paypalBooking = await payment.createPaypalBooking(req.user.email, totalPrice);

    const booking = new Booking({
      roomNumber: room.roomNumber,
      participants: participantsCount,
      rentInstruments,
      startTime: ms,
      endTime: me,
      userId: req.user.id,
      howLong,
      isVIP,
      paypalId: paypalBooking.result.id,
      totalPrice,
    });

    await booking.save();

    const redirectUrl = paypalBooking.result.links.find((link) => link.rel === "approve");

    res.status(201).json({
      message: "room booked successfully",
      booking,
      redirectUrl: redirectUrl.href,
    });
  } catch (error) {
    //console.dir(error.errors[0].path);
    console.log({ error });

    res.status(500).json({ message: "invalid date" });
  }
};

export const approveBooking = async (req, res) => {
  try {
    const approvedBooking = await payment.capturePayment(req.query.token);
    const updatedBooking = await Booking.findOneAndUpdate({ paypalId: approvedBooking.id }, { isPaid: true }, { new: true });

    res.status(200).redirect("http://localhost:5173");
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    await Booking.findOneAndDelete({ paypalId: req.query.token });
    res.status(200).redirect("http://localhost:5173/practice-room-booking");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
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

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId").sort({ startTime: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "no room available" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = (await Booking.find({ userId: req.user.id }).populate("rentInstruments.instrumentId")) ?? [];

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "no room available" });
  }
};
