/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { getUser } from "../../../../lib/getUser";
import { sendMail } from "../../../../lib/mail";
import { orderConfirmationEmail } from "../../../../lib/emailServices";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

  if (req.method === "POST") {
    /**
     * @desc Create new order
     * @route POST/api/order
     * @access Private
     */

    const { newOrder, paymentResult } = req.body;

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = newOrder;

    if (!(orderItems.length > 0) || !shippingAddress) {
      res.status(400).json({ message: "No order items" });
    }
    try {
      const order = await prisma.orders.create({
        data: {
          orderItems,
          user: { connect: { id: userData.id } },
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
          isPaid: true,
          paidAt: new Date(),
          paymentResult: {
            id: paymentResult.id,
            status: paymentResult?.status,
            orderId: paymentResult?.orderId,
            update_time: paymentResult?.update_time,
            email_address:
              paymentResult?.payer?.email_address ||
              paymentResult?.email_address,
          },
        },
      });
      await prisma.$disconnect();
      res.status(201).json({ success: true, message: "Order created", order });
    } catch (error) {
      res
        .status(404)
        .json({ success: false, message: "Unable to create order" });
    }
  } else if (req.method === "GET") {
    /**
     * @desc Get all user orders
     * @route GET /api/orders/myOrders
     * @access Private/
     */

    try {
      const orders = await prisma.orders.findUnique({
        where: { userId: userData.id },
      });
      await prisma.$disconnect();
      if (orders) {
        res.status(200).json(orders);
      }
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
