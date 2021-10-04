/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import User from "../../../models/userModel";
import Token from "../../../models/tokenModel";
import db from "../../../lib/db";
import { NEXT_URL } from "../../../config";
import { sendMail } from "../../../lib/mail";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body;
    await db.connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      res.status(403).json({ message: "User does not exist" });
      return;
    }
    const token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();

    const securedTokenId = nanoid(32); // create a secure reset password token

    await new Token({
      userId: user._id,
      token: securedTokenId,
      type: "passwordReset",
      createdAt: Date.now(),
    }).save();

    await sendMail({
      to: user.email,
      from: "no-reply@bloomshair.co.uk",
      subject: " Reset your password.",
      html: `
                <div>
                    <p>Hello, ${user.name}</p>
                    <p>Please follow <a href="${NEXT_URL}/passwordReset?token=${securedTokenId}&id=${user._id}">this link</a> to reset your password.</p>
                </div>
                `,
    });
    res.status(204).end();
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
