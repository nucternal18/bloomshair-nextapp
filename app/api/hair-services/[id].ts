/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session: Session = (await getSession({ req })) as Session;

  if (req.method === "GET") {
    /**
     * @desc Fetch single product
     * @route GET /api/products/:id
     * @access Public
     */
    try {
      const service = await prisma.service.findUnique({
        where: { id: id as string },
      });
      if (service) res.status(200).json(service);
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
    /**
     * @desc check to see if logged in user is admin
     */
    if (!session.user?.isAdmin) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    try {
      await prisma.service.delete({ where: { id: id as string } });
      await prisma.$disconnect();
      res.json({ success: true, message: "Service deleted successfully" });
    } catch (error: any) {
      res.status(404).json({
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

    /**
     * @desc check to see if logged in user is admin
     */
    if (!session.user.isAdmin) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }
    const { name, price, category } = req.body;

    const existingService = await prisma.service.findUnique({
      where: { id: id as string },
    });

    if (!existingService) {
      res.status(404).json({ success: false, message: "Service not found" });
      return;
    }

    try {
      await prisma.service.update({
        where: { id: id as string },
        data: {
          name: name ? name : existingService.name,
          price: price ? price : existingService.price,
          category: category ? category : existingService.category,
        },
      });
      await prisma.$disconnect();
      res.json({ success: true, message: "Service updated successfully" });
    } catch (error: any) {
      res.status(404).json({
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
