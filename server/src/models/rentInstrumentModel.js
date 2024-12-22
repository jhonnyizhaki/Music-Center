import mongoose from 'mongoose';

const rentInstrumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    rentPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        enum: [
            'String instruments',
            'Keyboards',
            'Sound amplification',
            'Sound amplification',
            'Wind instruments',
            'Accessories',
            'Other'
        ],
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
    },
}, { timestamps: true });

const RentInstrument = mongoose.model('RentInstrument', rentInstrumentSchema);

export default RentInstrument
