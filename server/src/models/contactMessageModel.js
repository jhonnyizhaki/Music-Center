import mongoose from "mongoose";

const contactMessage = new mongoose.Schema(
  {
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    subject: { type: String, require: true },
    message: { type: String, require: true },
    isReed: { type: Boolean, require: true, default: false },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model("ContactMessage", contactMessage);

export default ContactMessage;
