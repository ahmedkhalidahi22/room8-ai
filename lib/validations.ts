import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "this field must be filled"),
  email: z
    .string()
    .min(1, "this form is required")
    .email("Email form is incorrect"),
  phone: z
    .string()
    .min(1, "this form is required")
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "Invalid Number!"
    ),
});

export const userDetailSchema = z.object({
  age: z.number().min(1, "this field must be filled"),
  nationality: z.string().min(1, "this form is required"),
  gender: z.string().min(1, "this form is required"),
  occupation: z.string().min(1, "this form is required"),
  userId: z.string(),
});
