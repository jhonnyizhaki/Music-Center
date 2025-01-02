import mongoose from 'mongoose';
import { rentInstrumentSchema } from './rentInstrumentModel.js';
import  { artistSchema } from './artistModel.js';

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomNumber: { type: Number, required: true },
    participants: { type: Number, required: true, min: 1 },
    rentInstrument: [rentInstrumentSchema],
    artists: [artistSchema],    
    startTime: { type: Date, required: true }, // Store as "HH:mm"
    endTime: { type: Date, required: true }, // Store as "HH:mm"
    totalPrice: { type: Number, require: true },
},
    { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking
