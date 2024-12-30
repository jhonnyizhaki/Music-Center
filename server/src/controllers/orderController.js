import Order from '../models/orderModel.js';
import Instrument from '../models/instrumentModel.js';
import paypal from "../config/paypal.js"
import { CheckoutPaymentIntent } from '@paypal/paypal-server-sdk'
import axios from 'axios';
import Cart from '../models/cartModel.js';
const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com"

async function generateAccessToken() {
    const response = await axios({
        url: PAYPAL_BASE_URL + '/v1/oauth2/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: process.env.PAYPAL_ID,
            password: process.env.PAYPAL_SECRET
        }
    })

    return response.data.access_token
}

async function capturePayment(orderId) {
    const accessToken = await generateAccessToken()

    const response = await axios({
        url: PAYPAL_BASE_URL + `/v2/checkout/orders/${orderId}/capture`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return response.data
}

// Add or create a card with an instrument
export const addOrder = async (req, res) => {
    try {
        const { items } = req.body; // item[] = {id, quantity}

        // check all items if there is enough in stock
        const quantityErrors = []
        for (const [index, item] of items.entries()) {
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

        const paypalResponse = await paypal.orders.ordersCreate({
            body: {
                intent: CheckoutPaymentIntent.CAPTURE,
                payer: {
                    emailAddress: req.user.email
                },

                purchaseUnits: [{
                    amount: {
                        currencyCode: "ILS",
                        value: totalPrice.toString()
                    },
                    // items: items.map((item)=>({
                    //     name:    item.name,
                    //     unitAmount: {
                    //       currencyCode: 'ILS',
                    //       value: item.price.toString(),
                    //     },
                    //     quantity: item.quantity.toString(),
                    // }))
                }],
                applicationContext: {
                    brandName: "music center",
                    cancelUrl: "http://localhost:5000/orders/approvePayment",
                    returnUrl: "http://localhost:5173",
                    userAction: "PAY_NOW"
                }
            }
        })



        const newOrder = new Order({
            userId: req.user.id,
            items: itemsForMap,
            totalPrice,
            paypalId: paypalResponse.result.id
        })
        await newOrder.save()
        const redirectUrl = paypalResponse.result.links.find((link) => link.rel === "approve")
        await Cart.updateMany({}, { $set: { items: [] } });


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

// Approve payment
export const approvePayment = async (req, res) => {
    try {
        console.log(req.query.token);
        // const { userId, instrumentId } = req.body;
        const approvedOrder = await capturePayment(req.query.token)

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

// Get user order
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
