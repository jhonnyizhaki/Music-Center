import { z } from "zod";
import validators from "../helpers/validators.js";

export const roomSchema = z.object({
  roomNumber: z.number().int().positive(),
  capacity: z.number().int().min(1).max(50),
  isVIP: z.boolean(),
  pricePerHour: z.number().positive(),
  isAvailable: z.boolean(),
});

export const userRoleSchema = z.object({
  role: z.enum(["user", "admin"]),
});

export const instrumentSchema = z.object({
  name: validators.mediumText,
  price: z.number().positive(),
  category: validators.mediumText,
  imageUrl: z.string().url(),
  stock: z.number().int().min(0),
});

export const categorySchema = z.object({
  name: validators.mediumText,
});
