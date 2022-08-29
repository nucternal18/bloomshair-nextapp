import { Prisma } from "@prisma/client";
import moment from "moment";
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

    const productStats = await prisma.products.count();
    const userStats = await prisma.users.findMany({
      where: {
        isAdmin: false,
      },
    });
    const orderStats = await prisma.orders.count();
    const ordersDelivered = await prisma.orders.count({
      select: { isDelivered: true },
    });
    const ordersPaid = await prisma.orders.count({ select: { isPaid: true } });
    const totalSalesStats = await prisma.orders.aggregate({
      _sum: {
        totalPrice: true,
      },
    });

    const monthlySales = (await prisma.orders.aggregateRaw({
      pipeline: [
        {
          $project: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            totalPrice: 1,
          },
        },
        {
          $group: {
            _id: {
              month: "$month",
              year: "$year",
            },
            totalPrice: { $sum: "$totalPrice" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ],
    })) as unknown as Prisma.JsonArray;

    const monthlySalesStats = monthlySales.map(
      (item: { _id: any; totalPrice: any }) => {
        const {
          _id: { year, month },
          totalPrice,
        } = item;
        const date = moment()
          .month(month - 1)
          .year(year)
          .format("MMM YYYY");
        return { date, totalPrice };
      }
    );

    await db.disconnect();
    res.status(200).json({
      productStats,
      userStats: userStats.length,
      orderStats,
      ordersDelivered: ordersDelivered.isDelivered,
      ordersPaid: ordersPaid.isPaid,
      totalSalesStats: totalSalesStats._sum.totalPrice,
      monthlySalesStats,
    });
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
