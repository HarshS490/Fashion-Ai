"use server";

import { db } from "@/lib/db";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ email, account, user, credentials, profile }) {
      if (!user.email || !user.name) return false;
      const existing_account = await db.account.findFirst({
        where: {
          email: user.email,
        },
      });
      // create a new account
      if (!existing_account) {
        await db.account.create({
          data: {
            email: user.email,
            username: user.name,
            id: user.id,
            profilePic: user.image,
          },
        });
      }
      // account already exists
      return true;
    },
  },
});

export { handler as GET, handler as POST };
