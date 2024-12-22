import mongoose from 'mongoose';



const bookingSchema = new mongoose.Schema({
    participantsCount: { type: Number, required: true },
    instruments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RentInstrument', required: true }],
    date: { type: Date, required: true },
    howLong: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },//how to cohos the name of the user
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking
