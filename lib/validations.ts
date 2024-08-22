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
  occupation: z.string().min(1, "Occupation is required"),
  nationality: z.string().min(1, "Nationality is required"),
  gender: z.string().min(1, "Gender is required"),
  age: z.number().min(18, "Must be at least 18 years old"),
  location: z.string().min(1, "Location is required"),
  budget: z.coerce.number().min(1, "Budget is required"),
  lookingFor: z.enum(["for-myself", "as-a-couple", "as-a-group"], {
    errorMap: () => ({ message: "Please select an option" }),
  }),
  children: z.enum(["no-children", "visiting-children", "living-children"], {
    errorMap: () => ({ message: "Please select an option" }),
  }),
  preferences: z.array(z.string()),
  description: z.string().min(1, "this form is required"),
  moveDate: z.coerce.date().min(new Date(), "Move date must be in the future"),
  userId: z.string(),
});
