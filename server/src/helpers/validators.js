import regex from "./regex.js";
import { string, z } from "zod";


const validators = {
  id: z.string().regex(regex.id),
  email: z.string().email().max(255),
  mediumText: z.string().nonempty().max(255),
  shortText: z.string().nonempty().max(63),
  longText: z.string().nonempty().max(1023),
  phone: z.string().regex(regex.phone),
  password: string().min(8).max(255),
  smallNumber: z.number().int().min(0).max(255),
  bigNumber: z.number().int().min(0).max(65535),
  date: z.date(),
  boolean: z.boolean(),
};

export default validators;
