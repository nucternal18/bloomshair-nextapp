/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

import { getUser } from "@lib/getUser";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  /**
   * @desc Get user session
   */
  const session: Session = await getSession({ req });
  /**
   * @desc check to see if their is a user session
   */
  if (!session) {
    res.status(401).json({ message: "Not Authorized" });
    return;
  }

  const userData = await getUser(req);

  if (req.method === "GET") {
    /**
     * @desc Get user by Id
     * @route GET /api/users/:id
     * @access Private/admin
     */

    try {
      const user = await prisma.user.findUnique({
        where: { id: id as string },
      });
      await prisma.$disconnect();
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } else if (req.method === "PUT") {
    /**
     * @desc UPDATE user
     * @route PUT /api/users/:id
     * @access Private/Admin
     */
    /**
     * @desc check to see if logged in user is admin
     */
    if (!session.user?.isAdmin) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }
    const { displayName, image, email, isAdmin, category } = req.body;

    try {
      await prisma.user.update({
        where: { id: id as string },
        data: {
          name: displayName,
          image: image,
          email: email,
          isAdmin: isAdmin,
          category: category,
        },
      });
      await prisma.$disconnect();
      res.status(204).json({ success: true, message: "User updated" });
    } catch (error: any) {
      res
        .status(404)
        .json({ success: false, message: "User not found", error });
    }
  } else if (req.method === "DELETE") {
    /**
     * @desc Delete all users
     * @route DELETE /api/users/:id
     * @access Private/admin
     */
    /**
     * @desc check to see if logged in user is admin
     */
    if (!session.user?.isAdmin) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }
    try {
      await prisma.user.delete({ where: { id: id as string } });
      await prisma.$disconnect();
      res.json({ success: true, message: "User removed successfully" });
    } catch (error) {
      res.status(404).json({ success: false, message: "Error removing user" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
