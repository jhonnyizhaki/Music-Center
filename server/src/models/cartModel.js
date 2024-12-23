import mongoose, { Schema } from 'mongoose'

const cartItemSchema = new Schema({
    instrumentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instrument', required: true },
    quantity: { type: Number, required: true, min: 1 },
}, { _id: false })

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
}, { timestamps: true });

const Cart = mongoose.model('carts', cartSchema);

export default Cart
