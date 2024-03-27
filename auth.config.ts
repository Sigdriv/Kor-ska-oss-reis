import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import discord from "next-auth/providers/discord";

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
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  // callbacks: {
  //   async session({ session, user, token }: any) {
  //     return {
  //       ...session,
  //       user,
  //       token,
  //     }
  //   }
  // }
} satisfies NextAuthConfig;
