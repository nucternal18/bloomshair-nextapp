/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { SERVER_URL } from "../../../config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const response = await fetch(`${SERVER_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const user = await response.json();

    if (response.ok) {
      // TODO:@Todo set cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", String(user.token), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "production" ? false : true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ user });
    } else {
      res.status(user.statusCode).json({ message: user });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
