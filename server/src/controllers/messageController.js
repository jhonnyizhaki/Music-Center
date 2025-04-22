import Message from "../models/messageModel.js";
import { z } from "zod";

const reqInputSchema = z.object({ message: z.string() });
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const createMessage = async (req, res) => {
  const reqInput = reqInputSchema.parse(req.body);

  const newMessage = new Message({ userId: req.user.id, message: reqInput.message });
  await newMessage.save();
  res.status(201).send("message created successfully");
};

export const deleteUser = async (req, res) => {
  console.log({ req });

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  try {
    const messageToDelete = await Message.findByIdAndDelete(req.body);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Error deleting room" });
  }
};
