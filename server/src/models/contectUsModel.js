import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, require: true },
    subject: { type: String, require: true },
    message: { type: String, require: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", contactMessageSchema);

export default Message;
