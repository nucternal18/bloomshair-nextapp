import NextAuth, { DefaultSession, Session } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type Session = {
    user?: {
      id: string;
      isAdmin: boolean;
      emailVerified: boolean;
      shippingAddress: {
        address: string;
        city: string;
        country: string;
        postalCode: string;
      };
    } & DefaultSession["user"];
    expires: ISODateString;
  };
}
