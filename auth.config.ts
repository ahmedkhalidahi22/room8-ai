import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "./lib/validations";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginFormSchema.safeParse(credentials);
        console.log("autorizing now...");

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (isPasswordValid) {
            console.log("user logged in", user);

            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
