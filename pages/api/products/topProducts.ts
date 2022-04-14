import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/productModel";
import db from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    /**
     * @desc Get top rated products
     * @route GET /api/products/topProducts
     * @access Public
     */
    await db.connectDB();

    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.status(200).json(products);
  }
}

export default handler;
