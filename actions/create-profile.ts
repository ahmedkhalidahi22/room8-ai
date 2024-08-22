'use server';

import { FormUserDetailSchema } from "@/lib/validations";
import prisma from "@/lib/prisma";
import { z } from "zod";

export async function createProfile(formData: z.infer<typeof FormUserDetailSchema>) {
  try {
    // Validate the form data
    const validatedData = FormUserDetailSchema.parse(formData);

    // Create the profile in the database
    const profile = await prisma.profile.create({
      data: validatedData,
    });

    return { success: true, profile };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}