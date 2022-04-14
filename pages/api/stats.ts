import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// models
import Order from "@models/orderModel";
import Product from "@models/productModel";
import User from "@models/userModel";

// utils
import db from "@lib/db";
import { getUser } from "@lib/getUser";

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
    await db.connectDB();

    const productStats = await Product.countDocuments({});
    const userStats = await User.countDocuments({});
    const orderStats = await Order.countDocuments({});
    const ordersDelivered = await Order.where({
      isDelivered: true,
    }).countDocuments();
    const ordersPaid = await Order.where({ isPaid: true }).countDocuments();
    const totalSalesStats = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const monthlySalesStats = await Order.aggregate([
      { $project: { month: { $month: "$createdAt" }, totalPrice: 1 } },
      {
        $group: {
          _id: { month: "$month" },
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ]);

    await db.disconnect();
    res.status(200).json({
      productStats,
      userStats,
      orderStats,
      ordersDelivered,
      ordersPaid,
      totalSalesStats,
      monthlySalesStats,
    });
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
