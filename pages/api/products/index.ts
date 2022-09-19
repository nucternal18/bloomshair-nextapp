import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

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
      where: {
        name: { contains: req.query.keyword as string, mode: "insensitive" },
      },
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
    const session: Session = (await getSession({ req })) as Session;

    /**
     * @desc Create a  product
     * @route POST /api/products
     * @access Private/Admin
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

    try {
      await prisma.product.create({
        data: {
          name: req.body.name,
          price: Number(req.body.price),
          user: { connect: { id: session.user?.id } },
          image:
            req.body.image ??
            "https://res.cloudinary.com/dtkjg8f0n/image/upload/v1625415632/blooms_hair_products/sample_wic9ml.jpg",
          brand: req.body.brand,
          category: req.body.category,
          countInStock: Number(req.body.countInStock),
          numReviews: 0,
          description: req.body.description,
          slug: req.body.slug,
        },
      });

      await prisma.$disconnect();
      res
        .status(201)
        .json({ success: true, message: "Product created successfully" });
    } catch (error: any) {
      res.status(409).json({
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
