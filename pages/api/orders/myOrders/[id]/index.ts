/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { withSentry } from "@sentry/nextjs";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  /**
   * @desc Get user session
   */
  const session: Session = await getSession({ req });
  /**
   * @desc check to see if their is a user session
   */
  if (!session) {
    res.status(401).json({ message: "Not Authorized" });
    return;
  }

  if (req.method === "GET") {
    /**
     * @desc Get an order by id
     * @route Get /api/order/myOrders/:id
     * @access Private
     */

    try {
      const order = await prisma.order.findUnique({
        where: { id: id as string },
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
      res.status(200).json(order);
    } catch (error: any) {
      res
        .status(404)
        .json({ success: false, message: "Order not found", error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default withSentry(handler);
