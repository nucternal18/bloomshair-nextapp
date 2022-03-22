/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import User from "../../../models/userModel";
import db from "../../../lib/db";
import { getUser } from "../../../lib/getUser";

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

    const users = await User.find({});
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "No users found" });
      throw new Error("Users not found");
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
