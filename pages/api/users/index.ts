/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * @desc Get all users
   * @route GET /api/users
   * @access Private/admin
   */
  if (req.method === "GET") {
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
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    try {
      const users = await prisma.user.findMany({});
      await prisma.$disconnect();
      res.status(200).json(users);
    } catch (error) {
      res.status(409).json({ message: "No users found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
