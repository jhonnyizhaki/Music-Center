import Instrument from "../models/instrumentModel.js";

// מוצרים פופולריים לפי מספר הזמנות
export const getPopularProducts = async (req, res) => {
  try {
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
          image: 1,
          price: 1,
          sales: { $size: "$sales" },
        },
      },
      { $sort: { sales: -1 } },
      { $limit: 5 },
    ]);

    res.json(popularProducts);
  } catch (error) {
    console.error("Error fetching popular products:", error);
    res.status(500).json({ message: "Server error" });
  }
};
   