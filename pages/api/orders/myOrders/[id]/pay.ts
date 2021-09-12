/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Order from "../../../../../models/orderModel";
import db from "../../../../../lib/db";
import { getUser } from "../../../../../lib/getUser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
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

  if (req.method === "PUT") {
    /**
     * @desc Update order to paid
     * @route PUT /api/order/myOrders/:id
     * @access Private
     */
    await db.connectDB();

    const { paymentResult } = req.body;
    try {
      const order = await Order.findById(id);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: paymentResult.id,
          status: paymentResult.status,
          update_time: paymentResult.update_time,
          email_address: paymentResult.payer.email_address,
        };
      }
      const updatedOrder = await order.save();
      await db.disconnect();
      res.json({ message: "Order Paid", order: updatedOrder });
    } catch (error) {
      await db.disconnect();
      res.status(404).json({ message: "Order not found" });
      throw new Error("Order not found");
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
