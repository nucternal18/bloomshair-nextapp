import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

import { getUser } from "@lib/getUser";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    /**
     * @desc Fetch all products
     * @route GET /api/products
     * @access Public
     */

    const pageSize = 6;
    let page: number;
    if (Number(req.query.page) > 1) {
      page = Number(req.query.page);
    } else {
      page = 1;
    }

    const count = await prisma.product.findMany({
      where: { name: req.query.keyword as string },
    });
    const products = await prisma.product.findMany({
      where: {
        name: { contains: req.query.keyword as string, mode: "insensitive" },
      },
      skip: pageSize * (page - 1),
      take: pageSize as number,
    });
    await prisma.$disconnect();
    res.status(201).json({
      products,
      pages: Math.ceil(count.length / pageSize),
      page: page,
    });
  } else if (req.method === "POST") {
    const session: Session = await getSession({ req });
    /**
     * @desc Create a  product
     * @route POST /api/products
     * @access Private/Admin
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
    try {
      await prisma.product.create({
        data: {
          name: "Sample Name",
          price: 0,
          user: { connect: { id: userData.id } },
          image:
            "https://res.cloudinary.com/dtkjg8f0n/image/upload/v1625415632/blooms_hair_products/sample_wic9ml.jpg",
          brand: "Sample brand",
          category: "Sample Category",
          countInStock: 0,
          numReviews: 0,
          description: "Sample description",
          slug: "sample-slug",
        },
      });
      await prisma.$disconnect();
      res
        .status(201)
        .json({ success: true, message: "Product created successfully" });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message ?? "Error creating product",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

export default handler;
