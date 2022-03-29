/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import db from "../../../lib/db";
import { getUser } from "../../../lib/getUser";
import Service from "../../../models/serviceModel";

type QueryObjProps = {
  category?: string | string[];
  position?: { $regex: string | string[]; $options: string };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    /**
     * @desc Create a new service item.
     * @route POST /api/hair-services
     * @access Private/admin
     */
    /**
     * @desc Get user session
     */
    const session = await getSession({ req });
    /**
     * @desc check to see if their is a user session
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

    await db.connectDB();

    const { service } = req.body;

    if (!service) {
      return res.status(400).send({ message: "Missing fields" });
    }
    const serviceItem = new Service({
      name: service.serviceName,
      price: parseFloat(service.price),
      category: service.category,
      createdBy: userData._id,
    });
    const createdServiceItem = await serviceItem.save();
    res.status(201).json(createdServiceItem);
  } else if (req.method === "GET") {
    /**
     * @desc GET all services.
     * @route GET /api/hair-services
     * @access Public
     */
    const { search, category, sortBy } = req.query;
    const queryObj: QueryObjProps = {};

    if (category && category !== "all") {
      queryObj.category = category;
    }
    if (search) {
      queryObj.position = { $regex: search, $options: "i" };
    }
    await db.connectDB();

    let result = Service.find(queryObj);

    // Chain sort conditions
    if (sortBy === "latest") {
      result = result.sort("-createdAt");
    }
    if (sortBy === "oldest") {
      result = result.sort("createdAt");
    }
    const services = await result;
    await db.disconnect();
    res.status(200).json(services);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
