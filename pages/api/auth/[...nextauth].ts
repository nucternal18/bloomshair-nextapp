import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import type NextAuthOptions from "next-auth/next";
import { Session } from "next-auth";
import { NextApiRequest } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

type CredentialsProps = {
  email: string;
  password: string;
};

export default NextAuth({
  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY,
    maxAge: 60 * 60 * 24 * 30,
  },
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials: CredentialsProps, req: NextApiRequest) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        await prisma.$disconnect();

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            image: user.image,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            emailVerified: user.emailVerified,
            shippingAddress: user.shippingAddress,
          };
        } else {
          return null;
        }
      },
      credentials: undefined,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    /**
     * @param  {object} session      Session object
     * @param  {object} token        User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @param  {object}  user      User object      (only available on sign in)
     * @return {object}              Session that will be returned to the client
     */
    async session({ session, token, user }): Promise<Session> {
      // Add property to session, like an access_token from a provider.
      session.user = token.user;
      return session;
    },
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt({ token, user, account }) {
      // Add access_token to the token right after signin
      user && (token.user = user);
      return token;
    },
  },
});
