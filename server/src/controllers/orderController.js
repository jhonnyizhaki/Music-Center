import Order from "../models/orderModel.js";
import Instrument from "../models/instrumentModel.js";
import Cart from "../models/cartModel.js";
import payment from "../helpers/payment.js";

export const crateOrder = async (req, res) => {
  try {
    const { items } = req.body; // item[] = {id, quantity}

    // check all items if there is enough in stock
    const quantityErrors = [];
    for (const item of items) {
      const instrument = await Instrument.findById(item.id);

      if (!instrument) {
        console.error(`Instrument not found with id ${item.id}`);
        return res.status(404).json({ message: "Instrument not found" });
      }
      if (item.quantity > instrument.stock) {
        quantityErrors.push({
          message: `Invalid quantity ${item.quantity} for stock of ${instrument.stock}`,
          instrumentId: item.id,
        });
      }
    }

    if (quantityErrors.length > 0) {
      console.error(`Invalid quantity for some items`, quantityErrors);
      return res.status(400).json(quantityErrors);
    }

    let totalPrice = 0;
    let itemsForMap = [];

    for (const item of items) {
      const instrument = await Instrument.findOne({ _id: item.id });
      await instrument.updateOne({ stock: instrument.stock - item.quantity });
      itemsForMap.push({ instrumentId: item.id, quantity: item.quantity });
      totalPrice += instrument.price * item.quantity;
    }

    const paypalOrder = await payment.createPaypalOrder(req.user.email, totalPrice);

    const newOrder = new Order({
      userId: req.user.id,
      items: itemsForMap,
      totalPrice,
      paypalId: paypalOrder.result.id,
    });

    await newOrder.save();

    const redirectUrl = paypalOrder.result.links.find((link) => link.rel === "approve");
    res.status(201).json({ message: "Order Created", redirectUrl, newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update an instrument's quantity in the card
export const updateInstrumentInOrder = async (req, res) => {
  try {
    const { orderId, instrumentId, quantity } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const item = order.items.find((item) => item.instrumentId.toString() === instrumentId);
    if (!item) return res.status(404).json({ message: "Instrument not found in order" });

    // Update quantity
    item.quantity = quantity;
    order.updatedAt = new Date();

    await order.save();

    res.status(200).json({ message: "Instrument updated in order" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Approve payment
export const approveOrder = async (req, res) => {
  try {
    const approvedOrder = await payment.capturePayment(req.query.token);
    const updatedOrder = await Order.findOneAndUpdate({ paypalId: approvedOrder.id }, { isPaid: true }, { new: true });
    console.log(approvedOrder.id);
    await Cart.updateMany({ userId: updatedOrder.userId }, { $set: { items: [] } });

    res.status(200).redirect("http://localhost:5173");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete an instrument from the card
export const deleteInstrumentFromOrder = async (req, res) => {
  try {
    const { orderId, instrumentId } = req.body;
    const existingOrder = await Order.findById(orderId).select("items");
    console.log(existingOrder);
    if (!existingOrder) return res.status(404).json({ message: "Order not found" });
    const updatedItems = existingOrder.items.filter((item) => item.instrumentId.toString() !== instrumentId);
    await Order.findByIdAndUpdate(orderId, { items: updatedItems });

    res.status(200).json({ message: "Instrument removed from order" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get user order
export const getUserOrder = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("items.instrumentId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserOrders = async (req, res) => {
  console.log("banana error");

  try {
    const orders = (await Order.find({ userId: req.user.id })) ?? [];
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = (await Order.find().populate("userId").populate("items.instrumentId")) ?? [];
    console.log({"orders":orders});
    
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteOrders = async (req, res) => {
  try {
    const body = req.body;
    await Order.findByIdAndDelete(body.id);
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const cancelOrder = async (req, res) => {
  try {
    console.log(req.query);
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
