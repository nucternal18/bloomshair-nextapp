/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma-db";
import { getUser } from "../../../lib/getUser";

type ServiceDataProps = {
  id: string;
  name: string;
  price: number;
  category: string;
  user?: {
    id: string;
  };
  createdAt: Date;
  updatedAt: Date;
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

    const { service } = req.body;

    if (!service) {
      return res.status(400).send({ message: "Missing fields" });
    }
    try {
      await prisma.services.create({
        data: {
          name: service.serviceName,
          price: parseFloat(service.price),
          category: service.category,
          user: { connect: { id: userData.id } },
        },
      });
      await prisma.$disconnect();
      res
        .status(201)
        .json({ success: true, message: "Service created successfully" });
    } catch (error) {
      res
        .status(404)
        .json({ success: false, message: "Unable to create service" });
    }
  } else if (req.method === "GET") {
    /**
     * @desc GET all services.
     * @route GET /api/hair-services
     * @access Public
     */
    const { sortBy } = req.query;

    let result: ServiceDataProps[];

    // Chain sort conditions
    if (sortBy === "latest") {
      result = await prisma.services.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    } else if (sortBy === "oldest") {
      result = await prisma.services.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });
    } else {
      result = await prisma.services.findMany({});
    }
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
