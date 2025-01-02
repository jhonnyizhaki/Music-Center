import Order from '../models/orderModel.js';
import Instrument from '../models/instrumentModel.js';
import Cart from '../models/cartModel.js';
import payment from '../helpers/payment.js';



// Add or create a card with an instrument
export const addOrder = async (req, res) => {
    try {
        const { items } = req.body; // item[] = {id, quantity}

        // check all items if there is enough in stock
        const quantityErrors = []
        for (const item of items) {
            const instrument = await Instrument.findById(item.id)

            if (!instrument)
                
                return res.status(404).json({ message: 'Instrument not found' });

            if (item.quantity > instrument.stock) {
                quantityErrors.push({ message: `Invalid quantity ${item.quantity} for stock of ${instrument.stock}`, instrumentId: item.id })
            }
        }

        if (quantityErrors.length > 0) {
            return res.status(400).json(quantityErrors)
        }

        let totalPrice = 0
        let itemsForMap = []

        for (const item of items) {
            const instrument = await Instrument.findOne({ _id: item.id })
            await instrument.updateOne({ stock: instrument.stock - item.quantity })
            itemsForMap.push({ instrumentId: item.id, quantity: item.quantity })
            totalPrice += instrument.price * item.quantity
        }

        const paypalOrder = await payment.createPaypalOrder(req.user.email, totalPrice)

        const newOrder = new Order({
            userId: req.user.id,
            items: itemsForMap,
            totalPrice,
            paypalId: paypalOrder.result.id
        })

        await newOrder.save()
        await Cart.updateMany({}, { $set: { items: [] } });

        const redirectUrl = paypalOrder.result.links.find((link) => link.rel === "approve")
        res.status(201).json({ message: 'Order Created', redirectUrl, newOrder });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }


};

// Update an instrument's quantity in the card
export const updateInstrumentInOrder = async (req, res) => {
    try {
        const { userId, instrumentId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Card not found' });

        const item = card.items.find(item => item.instrumentId.toString() === instrumentId);
        if (!item) return res.status(404).json({ message: 'Instrument not found in card' });

        // Update quantity
        item.quantity = quantity;
        cart.updatedAt = new Date();

        await cart.save();

        res.status(200).json({ message: 'Card updated successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Approve payment
export const approvePayment = async (req, res) => {
    try {
        console.log(req.query.token);
        // const { userId, instrumentId } = req.body;
        const approvedOrder = await payment.capturePayment(req.query.token)

        await Order.findOneAndUpdate({ paypalId: approvedOrder.id }, { isPaid: true })
        console.log(approvedOrder);


        res.status(200).json({ message: 'payment approved' });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Server error', error });
    }
};



// Delete an instrument from the card
export const deleteInstrumentFromOrder = async (req, res) => {
    try {
        const { userId, instrumentId } = req.body;

        const card = await Cart.findOne({ userId });
        if (!card) return res.status(404).json({ message: 'Card not found' });

        // Remove the instrument from the card
        card.items = card.items.filter(item => item.instrumentId.toString() !== instrumentId);
        card.updatedAt = new Date();

        await card.save();

        res.status(200).json({ message: 'Instrument removed from card', card });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get user order
export const getUserOrder = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).populate('items.instrumentId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
