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
  const session: Session = (await getSession({ req })) as Session;
  /**
   * @desc check to see if their is a user session
   */
  if (!session) {
    res.status(401).json({ message: "Not Authorized" });
    return;
  }

  if (req.method === "PUT") {
    /**
     * @desc Update an order
     * @route Put /api/order/myOrders/:id
     * @access Private
     */
    const { paymentResult } = req.body;

    const existingOrder = await prisma.orders.findUnique({
      where: { id: id as string },
    });

    if (!existingOrder) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    try {
      const order = await prisma.orders.update({
        where: { id: id as string },
        data: {
          isPaid: true,
          paidAt: new Date(),
          paymentResult: paymentResult
            ? paymentResult
            : existingOrder.paymentResult,
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
