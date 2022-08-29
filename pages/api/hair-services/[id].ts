/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma-db";
import { getUser } from "../../../lib/getUser";
import Service from "../../../models/serviceModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getSession({ req });

  if (req.method === "GET") {
    /**
     * @desc Fetch single product
     * @route GET /api/products/:id
     * @access Public
     */
    try {
      const service = await prisma.services.findUnique({
        where: { id: id as string },
      });
      if (service) res.status(200).json({ service });
    } catch (error) {
      res
        .status(404)
        .json({ success: false, message: "Service item not found", error });
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
      await prisma.services.delete({ where: { id: id as string } });
      await prisma.$disconnect();
      res.json({ success: true, message: "Service deleted successfully" });
    } catch (error: any) {
      res
        .status(404)
        .json({
          success: false,
          message: "Unable to delete service item",
          error,
        });
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
    try {
      await prisma.services.update({
        where: { id: id as string },
        data: {
          name: service.name,
          price: service.price,
          category: service.category,
        },
      });
      await prisma.$disconnect();
      res.json({ success: true, message: "Service updated successfully" });
    } catch (error: any) {
      res
        .status(404)
        .json({
          success: false,
          message: "Unable to update service item",
          error,
        });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
