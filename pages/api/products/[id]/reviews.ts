/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Product from "../../../../models/productModel";
import db from "../../../../lib/db";
import { getUser } from "../../../../lib/getUser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getSession({ req });
  if (req.method === "POST") {
    /**
     * @desc Create new review
     * @route POST /api/products/:id/reviews
     * @access Private
     */
    if (!session) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }
    await db.connectDB();

    const { review } = req.body;
    const { rating, comment } = review;
    const userData = await getUser(req);

    try {
      const product = await Product.findById(id);

      if (product) {
        const alreadyReviewed = product.reviews.find(
          (r) => r.user.toString() === userData._id.toString()
        );

        if (alreadyReviewed) {
          res.status(400);
          throw new Error("Product already reviewed");
        }

        const review = {
          name: userData.name,
          rating: Number(rating),
          comment,
          user: userData._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
        await product.save();
        res.status(201).json({ message: "Review created successfully" });
      }
    } catch (error) {
      res.status(404).json({ message: "Review not created" });
      throw new Error("Product not found");
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
