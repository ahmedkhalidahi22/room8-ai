'use server';

import prisma from "@/lib/prisma";
import { FormUserDetailSchema } from "@/lib/validations";
import { z } from "zod";
export const createProfile = async (userId: string, data: z.infer<typeof FormUserDetailSchema>) => {
  const profile = await prisma.profile.create({
    data: {
      userId,
      age: data.age,
      gender: data.gender,
      nationality: data.nationality,
      location: data.location,
      budget: data.budget,
      lookingFor: data.lookingFor,
      moveDate: data.moveDate,
      children: data.children,
      preferences: data.preferences,
      description: data.description,
      occupation: data.occupation,
    },
  });
  return profile;
};