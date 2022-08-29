/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import bcrypt from "bcryptjs";

import { prisma } from "@lib/prisma-db";
import { getUser } from "../../../lib/getUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
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
    /**
     * @desc Get current user session
     */
    const userData = await getUser(req);

    const existingUser = await prisma.users.findUnique({
      where: { id: userData.id },
    });

    if (!bcrypt.compareSync(req.body.password, existingUser.password)) {
      res.status(403).json({ message: "Incorrect password" });
      return;
    }

    try {
      await prisma.users.update({
        where: { id: userData.id },
        data: {
          password:
            req.body.newPassword && bcrypt.hashSync(req.body.newPassword, 10),
        },
      });
      await prisma.$disconnect();
      res.json({ success: true, message: "User updated successfully" });
    } catch (error: any) {
      res
        .status(404)
        .json({ success: false, message: "Unable user details", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
