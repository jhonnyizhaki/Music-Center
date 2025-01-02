import mongoose from 'mongoose';

const orderInstrumentSchema = new mongoose.Schema({
    instrumentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instrument', required: true },
    quantity: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderInstrumentSchema], // List of instruments in the card
    totalPrice: { type: Number },
    isPaid: {type: Boolean, default: false},
    paypalId: {type: String, required: true}
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

export default Order;