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

  if (req.method === "DELETE") {
    /**
     * @desc DELETE a  product
     * @route DELETE /api/products/:slug/:id
     * @access Private/Admin
     */

    try {
      await prisma.product.delete({ where: { id: id as string } });

      res.status(201).json({ success: true, message: "Product removed" });
    } catch (error: any) {
      res
        .status(404)
        .json({ success: false, message: "Unable to delete product", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
