/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import Token from "../../../models/tokenModel";
import db from "../../../lib/db";
import { NEXT_URL } from "../../../config";
import { sendMail } from "../../../lib/mail";
import { verifyEmail } from "../../../lib/emailServices";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id, name, email } = req.body;
    await db.connectDB();

    const securedTokenId = nanoid(32); // create a secure reset password token

    const token = await new Token({
      userId: id,
      token: securedTokenId,
      type: "emailVerify",
      createdAt: Date.now(),
    }).save();

    const url = `${NEXT_URL}/account/verify-email/${securedTokenId}`;

    const subject = "Verification Email for Blooms Hair";
    if (token) {
      await sendMail({
        to: email,
        from: '"Blooms Hair" <bookings@bloomshair.co.uk>',
        subject,
        html: verifyEmail(subject, name, url),
      });
      res.status(204).end();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
