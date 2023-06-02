import { Prisma } from "@prisma/client";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

// utils
import { getUser } from "@lib/getUser";

const prisma = new PrismaClient();

type ItemProps = {
  _id: {
    month: number;
    year: number;
  };
  totalPrice: number;
};

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

  /**
   * @desc check to see if logged in user is admin
   */
  if (!session.user?.isAdmin) {
    res.status(401).json({ message: "Not Authorized" });
    return;
  }

  if (req.method === "GET") {
    const productStats = await prisma.product.count();
    const userStats = await prisma.user.findMany({
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

    const monthlySalesData = JSON.parse(JSON.stringify(monthlySales));

    const monthlySalesStats = monthlySalesData.map((item: ItemProps) => {
      const {
        _id: { year, month },
        totalPrice,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM YYYY");
      return { date, totalPrice };
    });

    await prisma.$disconnect();
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
