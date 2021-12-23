/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Order from "../../../../models/orderModel";
import db from "../../../../lib/db";
import { getUser } from "../../../../lib/getUser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

  await db.connectDB();

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

    if (orderItems && orderItems.length === 0) {
      await db.disconnect();
      res.status(400).json({ message: "No order items" });
      throw new Error("No order items");
    } else {
      const order = new Order({
        orderItems,
        user: userData._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: true,
        paidAt: Date.now(),
        paymentResult: {
          id: paymentResult.id,
          status: paymentResult.status,
          update_time: paymentResult.update_time,
          email_address: paymentResult.payer.email_address,
        },
      });

      const createdOrder = await order.save();
      await db.disconnect();
      res.status(201).json(createdOrder);
    }
  } else if (req.method === "GET") {
    /**
     * @desc Get all orders
     * @route GET /api/orders/myOrders
     * @access Private/
     */

    const orders = await Order.find({ user: userData._id });
    await db.disconnect();
    if (orders) {
      res.status(200).json(orders);
    } else {
      await db.disconnect();
      res.status(404).json({ message: "No orders found" });
      throw new Error("No Orders found");
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
