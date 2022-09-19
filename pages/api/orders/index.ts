/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

import { getUser } from "../../../lib/getUser";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * @desc Get user session
   */
  const session: Session = (await getSession({ req })) as Session;
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
  if (!session.user?.isAdmin) {
    res.status(401).json({ message: "Not Authorized" });
    return;
  }

  if (req.method === "GET") {
    /**
     * @desc Get all orders
     * @route GET /api/orders
     * @access Private/Admin
     */

    try {
      const orders = await prisma.order.findMany({
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          deliveredAt: true,
          isDelivered: true,
          isPaid: true,
          itemsPrice: true,
          orderItems: true,
          paidAt: true,
          paymentMethod: true,
          paymentResult: true,
          shippingAddress: true,
          shippingPrice: true,
          taxPrice: true,
          totalPrice: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      await prisma.$disconnect();
      res.status(200).json(orders);
    } catch (error: any) {
      res
        .status(404)
        .json({ success: false, message: "No orders found", error });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
