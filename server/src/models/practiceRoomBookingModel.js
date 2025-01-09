import mongoose from "mongoose";
import { boolean } from "zod";

const rentInstrumentSchema = new mongoose.Schema({
  instrumentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instrument",
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },

  artist: { type: Boolean, default: false },
});

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    participants: {
      type: Number,
      required: true,
      min: 1,
    },
    rentInstruments: [rentInstrumentSchema],
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    isVIP: {
      type: Boolean,
      default: false,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paypalId: { type: String, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
