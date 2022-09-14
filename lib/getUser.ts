import { NextApiRequest } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { NextIncomingMessage } from "next/dist/server/request-meta";
import { NEXT_URL } from "../config";
type SessionProps = {
  id: string;
  image: string;
  name: string;
  email: string;
  isAdmin: boolean;
};
export async function getUser(
  req: NextIncomingMessage & {
    cookies: NextApiRequestCookies;
  }
): Promise<SessionProps> {
  try {
    const userRes = await fetch(`${NEXT_URL}/api/users/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.cookie,
      },
    });
    const user = await userRes.json();
    return user;
  } catch (error) {
    throw new Error("Unable to fetch user: " + error.message);
  }
}
