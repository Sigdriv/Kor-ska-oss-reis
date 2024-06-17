// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      phone?: string;
    } & DefaultSession["user"];
    token: any;
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    phone?: string;
  }

  interface JWT {
    id: string;
    role: string;
    phone?: string;
  }
}
