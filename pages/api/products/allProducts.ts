import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma-db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    /**
     * @desc Get all products
     * @route GET /api/products/topProducts
     * @access Public
     */

    const products = await prisma.products.findMany({});
    await prisma.$disconnect();
    res.status(200).json(products);
  }
}

export default handler;
