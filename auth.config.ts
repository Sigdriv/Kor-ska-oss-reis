import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validetedFields = LoginSchema.safeParse(credentials);

        if (validetedFields.success) {
          const { email, password } = validetedFields.data;

          const user = await getUserByEmail(email);

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // allowDangerousEmailAccountLinking: true,
    }),
  ],
  // callbacks: {
  //   async session({ session, user, token, role }: any) {
  //     return {
  //       ...session,
  //       user,
  //       token,
  //     };
  //   },
  // },

  // callbacks: {
  //   session: async ({ session, user }) => {
  //     session.user.role = user.role; // Add the role to the session
  //     return Promise.resolve(session);
  //   },
  // },

  trustHost: true,
} satisfies NextAuthConfig;
