/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { withSentry } from "@sentry/nextjs";
import Product from "../../../models/productModel";
import db from "../../../lib/db";
import { getUser } from "../../../lib/getUser";
import Service from "../../../models/serviceModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
      const service = await Service.findOne({ _id: id });
      if (service) res.status(200).json({ service });
    } catch (error) {
      res.status(404).json({ message: "Service item not found", error });
      throw new Error("Service item not found");
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

    try {
      const service = await Service.findOne({ _id: id });

      if (service && userData.isAdmin) {
        await service.remove();
        res.status(201).json({ message: "Service item removed" });
      }
    } catch (error) {
      res.status(404).json({ message: "Unable to delete service item", error });
      throw new Error("Service item not found");
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
    const { service } = req.body;
    console.log(service);
    const serviceItem = await Service.findOne({ _id: id });

    if (serviceItem) {
      serviceItem.name = service?.serviceName;
      serviceItem.price = service?.price;
      serviceItem.category = service?.category;

      const updatedServiceItem = await serviceItem.save();

      res.status(201).json(updatedServiceItem);
    } else {
      res.status(404);
      throw new Error("Service item not found");
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
