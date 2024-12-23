import mongoose from 'mongoose';
import RentInstrument from './rentInstrumentModel';

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    participants: { type: Number, required: true, min: 1 },
    RentInstrument: [RentInstrument],
    date: { type: Date, required: true }, // Store as "YYYY-MM-DD"
    startTime: { type: Date, required: true }, // Store as "HH:mm"
    endTime: { type: Date, required: true }, // Store as "HH:mm"
    totalPrice: { type: Number, require: true },
    timestamps: { type: Number, require: true }
});

export default mongoose.model('Booking', bookingSchema);
