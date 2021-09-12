/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import db from "../../../lib/db";
import { getUser } from "../../../lib/getUser";
import Picture from "../../../models/galleryModel";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

    await db.connectDB();

    try {
      const picture = await Picture.findById(id);

      if (picture) {
        await picture.remove();
        res.json({ message: "Picture removed" });
      }
    } catch (error) {
      res.status(404).json({ message: "Unable to delete picture" });
      throw new Error("Product not found");
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
