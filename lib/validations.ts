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

export const signupFormSchema = z.object({
  name: z.string().min(1, "this field must be filled"),
  email: z
    .string()
    .min(1, "this form is required")
    .email("Email form is incorrect"),
  phone: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "Invalid Number!"
    )
    .optional(),
  password: z.string().min(1, "this field must be filled"),
});

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, "this form is required")
    .email("Email form is incorrect"),
  password: z.string().min(1, "this field must be filled"),
});

export const FormUserDetailSchema = z.object({
  age: z.string().min(1, "this field must be filled"),
  nationality: z.string().min(1, "this form is required"),
  gender: z.string().min(1, "this form is required"),
  occupation: z.string().min(1, "this form is required"),
});

export const userDetailSchema = z.object({
  age: z.string().min(1, "this field must be filled"),
  nationality: z.string().min(1, "this form is required"),
  gender: z.string().min(1, "this form is required"),
  occupation: z.string().min(1, "this form is required"),
  userId: z.string(),
});
