/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import User from "../../../models/userModel";
import Token from "../../../models/tokenModel";
import db from "../../../lib/db";
import { NEXT_URL } from "../../../config";
import { sendMail } from "../../../lib/mail";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { token, password } = req.body;
    await db.connectDB();

    const deletedToken = await Token.findOne({ token: token });

    if (!deletedToken) {
      res.status(403).json({ message: "Invalid or Expired token" });
      return;
    }

    const user = await User.findOne({ _id: deletedToken.userId });
    if (user) {
      if (password) {
        user.password = password;
      }

      await user.save();

      await sendMail({
        to: user.email,
        from: "no-reply@bloomshair.co.uk",
        subject: "Password reset successfully.",
        html: `
                <div>
                    <p>Hello, ${user.name}</p>
                    <p>Password reset successfully.</p>
                </div>
                `,
      });

      res.status(204).json({ message: "Password reset successfully " });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
