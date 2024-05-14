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
