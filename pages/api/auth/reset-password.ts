/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import User from "../../../models/userModel";
import Token from "../../../models/tokenModel";
import db from "../../../lib/db";
import { sendMail } from "../../../lib/mail";
import { resetPasswordVerificationEmail } from "../../../lib/emailServices";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { token, password } = req.body;
    await db.connectDB();

    const deletedToken = await Token.findOne({ token: token });

    if (!deletedToken) {
      res.status(403).end();
      return;
    }

    const user = await User.findOne({ _id: deletedToken.userId });
    if (user) {
      if (password) {
        user.password = password;
      }

      await user.save();

      const name = user.name;
      const subject = "Password reset";

      await sendMail({
        to: user.email,
        from: '"Blooms Hair" <no-reply@bloomshair.co.uk>',
        subject: "Password reset successful.",
        html: resetPasswordVerificationEmail(subject, name),
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

export default withSentry(handler);
