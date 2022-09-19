/* eslint-disable import/no-anonymous-default-export */
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import { PrismaClient } from "@prisma/client";

import { sendMail } from "../../../lib/mail";
import { resetPasswordVerificationEmail } from "../../../lib/emailServices";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { token, password } = req.body;

    const existingToken = await prisma.token.findUnique({
      where: { token: token },
    });

    if (!existingToken) {
      res.status(403).end();
      await prisma.$disconnect();
      return;
    }

    const deletedToken = await prisma.token.delete({
      where: { token: token },
    });

    const user = await prisma.user.findUnique({
      where: { id: deletedToken.userId },
    });
    if (user) {
      if (password) {
        await prisma.user.update({
          where: { id: user.id },
          data: { password: bcrypt.hashSync(password, 10) },
        });
      }

      await prisma.$disconnect();

      const name = user.name;
      const subject = "Password reset";

      await sendMail({
        to: user.email,
        from: '"Blooms Hair" <no-reply@bloomshair.co.uk>',
        subject: "Password reset successful.",
        html: resetPasswordVerificationEmail(subject, name),
      });

      res
        .status(204)
        .json({ success: true, message: "Password reset successfully " });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default withSentry(handler);
