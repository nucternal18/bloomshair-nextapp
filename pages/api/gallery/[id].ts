/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma-db";
import { getUser } from "../../../lib/getUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  /**
   * @desc Delete an image from the gallery
   * @route DELETE /api/gallery/:id
   * @access Private/admin
   */
  if (req.method === "DELETE") {
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

    try {
      await prisma.pictures.delete({ where: { id: id as string } });

      await prisma.$disconnect();
      res.json({ success: true, message: "Picture deleted successfully" });
    } catch (error: any) {
      res
        .status(404)
        .json({ success: false, message: "Unable to delete picture", error });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
