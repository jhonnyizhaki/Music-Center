import Cart from '../models/cartModel.js';
import Instrument from '../models/instrumentModel.js';

export const getCart = async (req, res) => {
    try {
        const { id: userId } = req.user;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const cart = await Cart.findOne({ userId }).populate('items.instrumentId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json({ cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Add an item to the cart
export const addToCart = async (req, res) => {
    try {
        const { instrumentId, quantity } = req.body;

        if (!instrumentId) {
            return res.status(400).json({ message: 'Instrument ID is required' });
        }

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be a positive number' });
        }

        const instrument = await Instrument.findById(instrumentId);
        if (!instrument) {
            return res.status(404).json({ message: 'Instrument not found' });
        }

        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({
                userId: req.user.id,
                items: [],
            });
        }

        const existingItem = cart.items.find(item => item.instrumentId.toString() === instrument._id.toString());

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                instrumentId: instrument._id,
                quantity,
            });
        }
        console.log(cart);

        await cart.save();

        return res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

export const updateCartItemQuantity = async (req, res) => {
    try {
        const { instrumentId } = req.params; // Get the instrumentId from the URL params
        const { quantity } = req.body; // Get the quantity from the body

        if (!instrumentId) {
            return res.status(400).json({ message: 'Instrument ID is required' });
        }

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be a positive number' });
        }

        const instrument = await Instrument.findById(instrumentId);
        if (!instrument) {
            return res.status(404).json({ message: 'Instrument not found' });
        }

        const result = await Cart.updateOne(
            { userId: req.user.id, 'items.instrumentId': instrumentId },
            { $set: { 'items.$.quantity': quantity } }  // Update the quantity of the specific item in the array
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Item not found in the cart or no change made' });
        }

        return res.status(200).json({ message: 'Cart item updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Remove an item from the cart
export const removeCartItem = async (req, res) => {
    try {
        const { instrumentId } = req.params; // Get the instrumentId from the URL params

        if (!instrumentId) {
            return res.status(400).json({ message: 'Instrument ID is required' });
        }

        const result = await Cart.updateOne(
            { userId: req.user.id },
            { $pull: { items: { instrumentId } } }  // Remove the item with the specific instrumentId from the array
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Item not found in the cart' });
        }

        return res.status(200).json({ message: 'Cart item removed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Clear all items from the cart
export const clearCart = async (req, res) => {
    try {
        const result = await Cart.updateOne(
            { userId: req.user.id },
            { $set: { items: [] } }  // Clear all items from the cart
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};