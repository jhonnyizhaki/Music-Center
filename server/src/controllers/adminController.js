import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Instrument from "../models/instrumentModel.js";
import PracticeRoom from "../models/practiceRoomModel.js";
import Category from "../models/categoryModel.js";

export const getStats = async (req, res) => {
  try {
    // Get total orders and revenue
    const orders = await Order.find().populate("userId");
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    // Get total users
    const totalUsers = await User.countDocuments();

    // Get popular products
    const popularProducts = await Instrument.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "items.instrumentId",
          as: "sales",
        },
      },
      {
        $project: {
          name: 1,
          sales: { $size: "$sales" },
        },
      },
      { $sort: { sales: -1 } },
      { $limit: 5 },
    ]);

    // Get category statistics
    const categories = await Category.find();
    const categoryStats = await Promise.all(
      categories.map(async (category) => {
        const count = await Instrument.countDocuments({
          category: category.name,
        });
        return { name: category.name, value: count };
      })
    );

    // Get recent orders with revenue data
    const recentOrders = orders
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 10)
      .map((order) => ({
        date: order.createdAt,
        revenue: order.totalPrice,
      }));

    res.json({
      totalOrders,
      totalRevenue,
      totalUsers,
      popularProducts,
      categoryStats,
      recentOrders,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Error updating user role" });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await PracticeRoom.find();
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Error fetching rooms" });
  }
};

export const createRoom = async (req, res) => {
  try {
    const newRoom = new PracticeRoom(req.body);
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Error creating room" });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await PracticeRoom.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Error updating room" });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const room = await PracticeRoom.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Error deleting room" });
  }
};