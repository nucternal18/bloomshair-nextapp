/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Product from "@models/productModel";
import db from "@lib/db";
import { getUser } from "@lib/getUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connectDB();
  if (req.method === "GET") {
    /**
     * @desc Fetch single product
     * @route GET /api/products/:slug
     * @access Public
     */
    try {
      const product = await Product.findOne({ slug: req.query.slug });
      if (product) res.status(200).json({ product });
    } catch (error) {
      res.status(404).json({ message: "Product not found", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
