/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Product from "@models/productModel";
import db from "@lib/db";
import { prisma } from "@lib/prisma-db";
import { getUser } from "@lib/getUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getSession({ req });

  if (req.method === "DELETE") {
    /**
     * @desc DELETE a  product
     * @route DELETE /api/products/:slug/:id
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
    if (!userData.isAdmin) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    try {
      await prisma.products.delete({ where: { id: id as string } });

      res.status(201).json({ success: true, message: "Product removed" });
    } catch (error: any) {
      res
        .status(404)
        .json({ success: false, message: "Unable to delete product", error });
    }
  } else if (req.method === "PUT") {
    /**
     * @desc Update product
     * @route PUT /api/products/:slug/:id
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
    if (!userData.isAdmin) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    try {
      await prisma.products.update({
        where: { id: id as string },
        data: {
          name,
          price,
          description,
          image,
          brand,
          category,
          countInStock,
        },
      });

      res.status(201).json({ success: true, message: "Product updated" });
    } catch (error: any) {
      res.status(404).json({
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
