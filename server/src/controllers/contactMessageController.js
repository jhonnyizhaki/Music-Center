import { z } from "zod";
import ContactMessage from "../models/contactMessageModel.js";

const bodySchema = z.object({
  fullName: z.string().max(100),
  email: z.string().email().max(100),
  subject: z.string().max(200),
  message: z.string().max(2000),
});
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const createContactMessage = async (req, res) => {
  const reqBody = bodySchema.parse(req.body);

  const newMessage = new ContactMessage(reqBody);
  await newMessage.save();
  res.status(201).send("message created successfully");
};

export const getAllMessages = async (req, res) => {
  try {
    //const messages = req.params;

    const messages = await ContactMessage.find();
    if (!messages)
      return res.status(404).json({ message: "no available messages" });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateRead = async (req, res) => {
  try {
    //const messages = req.params;

    // Validate the incoming id value
    if (!req.params.id) {
      return res.status(400).json({ message: "Id was not provided." });
    }

    // Update in mongoose
    await ContactMessage.findByIdAndUpdate(req.params.id, {
      isReed: true,
    });

    res.status(204).json({});
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
