import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "../../../models/userModel";

import db from "../../../lib/db";

type CredentialsProps = {
  email: string;
  password: string;
};

type SessionProps = {
  user: {
    _id: string;
    image: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
  expires: Date;
};

export default NextAuth({
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY, //use a random secret token here
    encryption: true,
  },
  debug: true,
  providers: [
    Providers.Credentials({
      async authorize(credentials: CredentialsProps, req: NextApiRequest) {
        await db.connectDB();

        const user = await User.findOne({ email: credentials.email });

        await db.disconnect();

        if (user && (await user.matchPassword(credentials.password))) {
          return {
            _id: user._id,
            image: user.image,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    /**
     * @param  {object} session      Session object
     * @param  {object} token        User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @param  {object}  user      User object      (only available on sign in)
     * @return {object}              Session that will be returned to the client
     */
    session: async (session, user) => {
      // Add property to session, like an access_token from a provider.
      user && (session.user = user.user);
      return session;
    },
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    jwt: async (token, user, account) => {
      // Add access_token to the token right after signin
      if (user) {
        token.accessToken = user._id;
        token.user = user;
      }
      return token;
    },
  },
});
