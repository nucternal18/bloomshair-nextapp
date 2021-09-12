/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Product from "../../../../models/productModel";
import db from "../../../../lib/db";
import { getUser } from "../../../../lib/getUser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getSession({ req });
  await db.connectDB();
  if (req.method === "GET") {
    /**
     * @desc Fetch single product
     * @route GET /api/products/:id
     * @access Public
     */
    try {
      const product = await Product.findOne({ _id: id });
      if (product) res.status(200).json({ product });
    } catch (error) {
      res.status(404).json({ message: "Product not found", error });
      throw new Error("Product not found");
    }
  } else if (req.method === "DELETE") {
    /**
     * @desc DELETE a  product
     * @route DELETE /api/products/:id
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

    if (!userData.isAdmin) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }
    try {
      const product = await Product.findById(id);

      if (product && userData.isAdmin) {
        await product.remove();
        res.status(201).json({ message: "Product removed" });
      }
    } catch (error) {
      res.status(404).json({ message: "Unable to delete product", error });
      throw new Error("Product not found");
    }
  } else if (req.method === "PUT") {
    /**
     * @desc Update product
     * @route PUT /api/products/:id
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

    const product = await Product.findById(id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();

      res.status(201).json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
