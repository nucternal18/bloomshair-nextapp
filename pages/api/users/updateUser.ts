/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

import { getUser } from "../../../lib/getUser";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    /**
     * @desc Get user session
     */
    const session = await getSession({ req });
    /**
     * @desc check to see if their is a user session
     */
    if (!session) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }
    /**
     * @desc Get current user session
     */
    const userData = await getUser(req);

    try {
      await prisma.users.update({
        where: { id: userData.id },
        data: {
          name: req.body.displayName && req.body.displayName,
          image: req.body.image && req.body.image,
          email: req.body.email && req.body.email,
          shippingAddress: req.body.shippingAddress && req.body.shippingAddress,
        },
      });
      await prisma.$disconnect();
      res.json({ success: true, message: "User updated successfully" });
    } catch (error: any) {
      res
        .status(404)
        .json({ success: false, message: "Unable user details", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
