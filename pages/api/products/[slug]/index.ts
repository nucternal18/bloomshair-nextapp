/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    /**
     * @desc Fetch single product
     * @route GET /api/products/:slug
     * @access Public
     */
    try {
      const product = await prisma.product.findUnique({
        where: { slug: req.query.slug as string },
      });
      if (product) res.status(200).json(product);
    } catch (error: any) {
      res
        .status(404)
        .json({ success: false, message: "Product not found", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
