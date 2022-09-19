/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { prisma } from "../../../lib/prisma-db";

import { getUser } from "../../../lib/getUser";

// const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * @desc Upload a picture to the database.
   * @route POST /api/gallery
   * @access Private/admin
   */
  if (req.method === "POST") {
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

    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).send({ message: "Missing fields" });
    }
    try {
      await prisma.picture.create({
        data: {
          image: imageUrl,
          admin: { connect: { id: session.user?.id } },
        },
      });
      await prisma.$disconnect();
      res
        .status(201)
        .json({ success: true, message: "Picture uploaded successfully" });
    } catch (error: any) {
      res
        .status(409)
        .json({ success: false, message: "Unable to upload picture", error });
    }
  } else if (req.method === "GET") {
    /**
     * @desc GET all pictures.
     * @route GET /api/gallery
     * @access Public
     */

    const pictures = await prisma.picture.findMany({});
    await prisma.$disconnect();
    res.status(200).json(pictures);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
