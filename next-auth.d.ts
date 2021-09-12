import "next-auth";

declare global {
  declare module "next-auth/client" {
    interface User {
      _id: string;
      image: string;
      name: string;
      email: string;
      isAdmin: boolean;
    }

    interface Session {
      user: User;
    }
  }
}
