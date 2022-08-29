/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

import { getUser } from "../../../../lib/getUser";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  /**
   * @desc Update order to delivered
   * @route PUT /api/orders/:id/deliver
   * @access Private/Admin
   */
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

    const userData = await getUser(req);
    /**
     * @desc check to see if logged in user is admin
     */
    if (!userData.isAdmin) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    try {
      await prisma.orders.update({
        where: { id: id as string },
        data: { isDelivered: true, deliveredAt: new Date() },
      });
      await prisma.$disconnect();
      res
        .status(201)
        .json({ success: true, message: "Order marked as delivered" });
    } catch (error: any) {
      res
        .status(404)
        .json({ success: false, message: "Unable to update order", error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default withSentry(handler);
