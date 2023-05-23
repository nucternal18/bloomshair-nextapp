/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method === "GET") {
    /**
     * @desc SEND PAYPAL_CLIENT_ID to client
     * @route GET /api/paypal
     * @access Private
     */

    if (!session) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    res.status(200).json({ data: process.env.PAYPAL_CLIENT_ID || "sb" });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
