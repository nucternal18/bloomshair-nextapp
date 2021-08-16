/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { client } from "../../../lib/square-client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);
    if (!token) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    // if (response.ok) {
    //   res.status(200).json(JSON.stringify(data));
    // } else {
    //   res.status(403).json({ message: 'User forbidden' });
    // }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
