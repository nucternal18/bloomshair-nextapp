/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

import { getUser } from "@lib/getUser";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const session: Session = (await getSession({ req })) as Session;
  if (req.method === "POST") {
    /**
     * @desc Create new review
     * @route POST /api/products/:slug/reviews
     * @access Private
     */
    if (!session) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    const { review } = req.body;
    const { rating, comment } = review;

    try {
      const product = await prisma.product.findUnique({
        where: { slug: slug as string },
      });

      if (product) {
        const alreadyReviewed = product.reviews.find(
          (review) => review.user.toString() === session.user?.id.toString()
        );

        if (alreadyReviewed) {
          res
            .status(400)
            .json({ message: "You have already reviewed this product" });
        }
        const reviewId = nanoid(24);
        const reviewRating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
        const review = {
          id: reviewId,
          name: session.user?.name,
          rating: Number(rating),
          comment,
          user: session.user?.id,
        };

        await prisma.product.update({
          where: { id: product.id },
          data: {
            reviews: {
              ...review,
            },
            numReviews: product.reviews.length,
            rating: Number(reviewRating),
          },
        });

        await prisma.$disconnect();
        res
          .status(201)
          .json({ success: true, message: "Review created successfully" });
      }
    } catch (error) {
      res.status(404).json({
        success: false,
        message: "Review not created. Product not found",
      });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
