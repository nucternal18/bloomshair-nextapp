/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { withSentry } from "@sentry/nextjs";
import Order from "../../../models/orderModel";
import db from "../../../lib/db";
import { getUser } from "../../../lib/getUser";

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
  /**
   * @desc check to see if logged in user is admin
   */
  if (!userData.isAdmin) {
    res.status(401).json({ message: "Not Authorized" });
    return;
  }

  if (req.method === "GET") {
    /**
     * @desc Get all orders
     * @route GET /api/orders
     * @access Private/Admin
     */
    await db.connectDB();

    const orders = await Order.find({}).populate("user", "id name");
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "No orders found" });
      throw new Error("No Orders found");
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default withSentry(handler);
