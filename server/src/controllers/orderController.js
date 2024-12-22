import Order from '../models/orderModel.js';
import Instrument from '../models/instrumentModel.js';


// Add or create a card with an instrument
export const addOrder = async (req, res) => {
    try {
        // 
        const { items } = req.body;// item[] = {id, quantity}
        let totalPrice = 0
        for (const i in items) {
            const item = items[i]
            const instrument = await Instrument.findById(item.id).select({
                price: 1
            })
            if (!instrument) return res.status(404).json({ message: 'Instrument not found' });
            totalPrice += instrument.price * item.quantity
        }


        console.log({
            userId: req.user.id,
            items,
            totalPrice,
        })

        const newOrder = new Order({
            userId,
            items: items.map((i) => ({ ...i, instrumentId: i.id })),
            totalPrice,
        })
        await newOrder.save()
        res.status(201).json({ message: 'Order Created', newOrder });
    } catch (error) {
        console.log("Banana eror", error)
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update an instrument's quantity in the card
export const updateInstrumentInOrder = async (req, res) => {
    try {
        const { userId, instrumentId, quantity } = req.body;

        const card = await Card.findOne({ userId });
        if (!card) return res.status(404).json({ message: 'Card not found' });

        const item = card.items.find(item => item.instrumentId.toString() === instrumentId);
        if (!item) return res.status(404).json({ message: 'Instrument not found in card' });

        // Update quantity
        item.quantity = quantity;
        card.updatedAt = new Date();

        await card.save();

        res.status(200).json({ message: 'Card updated successfully', card });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete an instrument from the card
export const deleteInstrumentFromOrder = async (req, res) => {
    try {
        const { userId, instrumentId } = req.body;

        const card = await Card.findOne({ userId });
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

// Get user's card
export const getUserOrder = async (req, res) => {
    try {
        const { userId } = req.params;

        const card = await Card.findOne({ userId }).populate('items.instrumentId');
        if (!card) return res.status(404).json({ message: 'Card not found' });

        res.status(200).json({ card });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
