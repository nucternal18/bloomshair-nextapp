/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Category, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

const prisma = new PrismaClient();

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
    const session: Session = (await getSession({ req })) as Session;
    /**
     * @desc check to see if their is a user session
     */
    if (!session) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    /**
     * @desc check to see if logged in user is admin
     */
    if (!session.user?.isAdmin) {
      res.status(401).json({ success: false, message: "Not Authorized" });
      return;
    }

    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .send({ success: false, message: "Missing fields" });
    }

    const existingService = await prisma.service.findUnique({
      where: { name: name },
    });

    if (existingService) {
      return res
        .status(400)
        .send({ success: false, message: "Service already exists" });
    }

    try {
      await prisma.service.create({
        data: {
          name: name,
          price: parseFloat(price),
          category: category,
          user: { connect: { id: session.user?.id } },
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
    const { sortBy, category } = req.query;

    let result: ServiceDataProps[];

    // Chain sort conditions
    if (sortBy === "latest" || category) {
      result = await prisma.service.findMany({
        where: { category: category as Category },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else if (sortBy === "oldest" || category) {
      result = await prisma.service.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });
    } else {
      result = await prisma.service.findMany({});
    }

    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
