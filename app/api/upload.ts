/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

import cloudinary from "../../lib/cloudinary";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: Session = (await getSession({ req })) as Session;
  if (req.method == "POST") {
    /**
     * @desc Upload image to cloudinary
     * @route POST /api/upload
     * @access Private/admin
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
      const fileStr = req.body.data;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "blooms_hair_products",
      });
      const { secure_url } = uploadedResponse;
      res.status(201).json({ image: secure_url });
    } catch (error) {
      console.error(error);
      res.status(409).json({ err: "Something went wrong uploading image" });
    }
  } else {
    return res.status(405).json({
      success: false,
      error: "Server Error. Invalid Request",
    });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default handler;
