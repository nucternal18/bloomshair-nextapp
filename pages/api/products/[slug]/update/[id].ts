/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session: Session = (await getSession({ req })) as Session;

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
  if (req.method === "PUT") {
    /**
     * @desc Update product
     * @route PUT /api/products/:slug/:id
     * @access Private/Admin
     */
    const existingProduct = await prisma.product.findUnique({
      where: { id: id as string },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
      slug,
    } = req.body;

    try {
      await prisma.product.update({
        where: { id: id as string },
        data: {
          name: name ? name : existingProduct.name,
          price: price ? price : existingProduct.price,
          description: description ? description : existingProduct.description,
          image: image ? image : existingProduct.image,
          brand: brand ? brand : existingProduct.brand,
          category: category ? category : existingProduct.category,
          countInStock: countInStock
            ? Number(countInStock)
            : existingProduct.countInStock,
          slug: slug ? slug : existingProduct.slug,
        },
      });

      res.status(201).json({ success: true, message: "Product updated" });
    } catch (error: any) {
      res.status(409).json({
        success: false,
        message: "Unable to update product. Product not found",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
