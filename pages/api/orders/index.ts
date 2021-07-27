/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { SERVER_URL } from "../../../config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const { order } = req.body;

    const { token } = cookie.parse(req.headers.cookie);

    const response = await fetch(`${SERVER_URL}/api/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        order,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      res.status(200).json({ data });
    } else {
      res.status(403).json({ message: "Review not created" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
