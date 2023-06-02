/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import bcrypt from "bcryptjs";
import { PrismaClient, User } from "@prisma/client";
import { Session } from "next-auth";

import { getUser } from "../../../lib/getUser";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
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
     * @desc Get current user session
     */

    const existingUser: User | null = await prisma.user.findUnique({
      where: { id: session.user?.id },
    });

    if (existingUser) {
      if (
        !bcrypt.compareSync(
          req.body.password,
          JSON.stringify(existingUser.password)
        )
      ) {
        res.status(403).json({ message: "Incorrect password" });
        return;
      }
    }

    try {
      await prisma.user.update({
        where: { id: session.user?.id },
        data: {
          password:
            req.body.newPassword && bcrypt.hashSync(req.body.newPassword, 10),
        },
      });
      await prisma.$disconnect();
      res.json({ success: true, message: "User updated successfully" });
    } catch (error: any) {
      res
        .status(409)
        .json({ success: false, message: "Unable user details", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
