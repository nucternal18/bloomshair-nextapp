/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { withSentry } from "@sentry/nextjs";
import { PrismaClient } from "@prisma/client";

import { NEXT_URL } from "../../../config";
import { sendMail } from "../../../lib/mail";
import { resetPasswordRequestEmail } from "../../../lib/emailServices";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(403).json({ message: "User does not exist" });
      await prisma.$disconnect();
      return;
    }
    const token = await prisma.token.findUnique({
      where: { userId: user.id },
    });
    if (token) await prisma.token.delete({ where: { id: token.id } });

    const securedTokenId = nanoid(32); // create a secure reset password token

    await prisma.token.create({
      data: {
        userId: user.id,
        token: securedTokenId,
        type: "passwordReset",
      },
    });

    await prisma.$disconnect();
    const url = `${NEXT_URL}/account/forgot-password/${securedTokenId}`;
    const name = user.name;
    const subject = "Password reset";

    await sendMail({
      to: user.email,
      from: '"Blooms Hair" <no-reply@bloomshair.co.uk>',
      subject: "Reset your password.",
      html: resetPasswordRequestEmail(subject, name, url),
    });
    res.status(204).json({
      success: true,
      message: "Password change request sent. Please check you email inbox",
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default withSentry(handler);
