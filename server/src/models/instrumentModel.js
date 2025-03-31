import mongoose from "mongoose";

const instrumentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,

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
  },
  { timestamps: true }
);

const Instrument = mongoose.model("Instrument", instrumentSchema);

export default Instrument;
