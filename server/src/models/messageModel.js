import mongoose from "mongoose";

const message = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, require: true },
    isReed: { type: Boolean, require: true, default: false },
    isManager: { type: Boolean, require: true, default: false },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", message);

export default Message;
