import PracticeRoom from "../models/practiceRoomModel.js";
import Booking from "../models/practiceRoomBookingModel.js";
import { addHours } from "date-fns";
import RentInstrument from "../models/rentInstrumentModel.js";
import payment from "../helpers/payment.js";
import { z } from "zod";

async function machRoom(startDate, endDate, isVIP, participantsCount) {
  try {
    const ms = new Date(1776626081761);
    const me = new Date(1776926081761);
    console.log(ms, me);

    const conflictedBookings = await Booking.find({
      startTime: { $gte: ms },
      endTime: { $lte: me },
    });

    const availableRoom = await PracticeRoom.findOne({
      isVIP: isVIP,
      capacity: { $gte: participantsCount },
      // roomNumber: { $nin: [2] },
    });
    console.log(availableRoom);

    if (!availableRoom) {
      console.error("filed to find room", { conflictedBookings }, availableRoom);

      throw new Error("no available rooms");
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
        id: z.string(),
        artist: z.boolean().default(false),
        quantity: z.number().min(1),
      })
    )
    .optional(),
  startDate: z.string().transform((value) => new Date(value)),
  howLong: z.number().min(1),
  isVIP: z.boolean().default(false),
});

export const createBooking = async (req, res) => {
  console.log(req.body);

  try {
    const { howLong, rentInstruments, isVIP, participantsCount, startDate } = machRoomSchema.parse(req.body);
    console.log(startDate);

    const endDate = addHours(startDate, howLong);
    const date = new Date(1776626081761);
    console.log(date);

    const room = await machRoom(date, endDate, isVIP, participantsCount);

    const instrumentsToInsert = [];

    let totalPrice = room.pricePerHour * howLong;
    console.log("totalPrice before the instruments", room, howLong);
    if (rentInstruments)
      for (const item of rentInstruments) {
        const instrument = await RentInstrument.findById(item.id);
        if (!instrument) return res.status(404).json({ message: "Instrument not found" });
        if (item.quantity > instrument.stock) return res.status(400).json({ message: "not a valid quantity" });
        instrumentsToInsert.push({ ...item, stock: instrument.stock });
        totalPrice += instrument.price * item.quantity;
      }
    console.log("totalPrice after the instruments", totalPrice);

    for (const item of instrumentsToInsert) {
      await RentInstrument.findOneAndUpdate({ id: item.id }, { stock: item.stock - item.quantity });
    }
    const ms = new Date(startDate);
    const me = new Date(1776926081761);
    console.log(ms, me, startDate);
    const paypalBooking = await payment.createPaypalBooking(req.user.email, totalPrice);

    const booking = new Booking({
      roomNumber: room.roomNumber,
      participants: participantsCount,
      rentInstruments,
      startTime: ms,
      endTime: me,
      userId: req.user.id,
      howLong,
      paypalId: paypalBooking.result.id,
      totalPrice,
    });

    await booking.save();

    const redirectUrl = paypalBooking.result.links.find((link) => link.rel === "approve");

    res.status(201).json({
      message: "room booked successfully",
      booking,
      redirectUrl,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "booking failed" });
  }
};

export const approveBooking = async (req, res) => {
  console.log("banana error");

  try {
    const approvedBooking = await payment.capturePayment(req.query.token);
    const updatedBooking = await Booking.findOneAndUpdate({ paypalId: approvedBooking.id }, { isPaid: true }, { new: true });
    console.log(approvedBooking.id);

    res.status(200).redirect("http://localhost:5173");
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

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId").sort({ startTime: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "no room available" });
  }
};