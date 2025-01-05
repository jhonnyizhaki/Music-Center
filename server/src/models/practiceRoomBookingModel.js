import mongoose from 'mongoose';

const rentInstrumentSchema = new mongoose.Schema({
    instrumentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Instrument', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        default: 1 
    }
});

const bookingSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    roomNumber: { 
        type: Number, 
        required: true 
    },
    participants: { 
        type: Number, 
        required: true, 
        min: 1 
    },
    rentInstruments: [rentInstrumentSchema],
    date: { 
        type: Date, 
        required: true 
    },
    time: { 
        type: String, 
        required: true 
    },
    startTime: { 
        type: Date, 
        required: true 
    },
    endTime: { 
        type: Date, 
        required: true 
    },
    isVIP: { 
        type: Boolean, 
        default: false 
    },
    totalPrice: { 
        type: Number, 
        required: true 
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
