import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import prisma from "../../../lib/prisma";
import GitHubProvider from "next-auth/providers/github";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
    ],
    secret: process.env.SECRET,
    session: {
      strategy: "database",
    },
    theme: {
      colorScheme: "auto",
    },
    debug: false,
  });
}
