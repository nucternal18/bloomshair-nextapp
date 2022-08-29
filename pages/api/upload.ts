/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getUser } from "../../lib/getUser";
import cloudinary from "../../lib/cloudinary";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
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
    const userData = await getUser(req);
    /**
     * @desc check to see if logged in user is admin
     */
    if (!userData.isAdmin) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }
    try {
      const fileStr = req.body.data;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "blooms_hair_products",
      });

      res.status(201).json(uploadedResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Something went wrong uploading image" });
    }
  } else {
    return res.status(500).json({
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
