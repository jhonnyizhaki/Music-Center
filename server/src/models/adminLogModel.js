import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    ip: String,
    userAgent: String,
  },
  { timestamps: true }
);

const AdminLog = mongoose.model("AdminLog", adminLogSchema);
export default AdminLog;
