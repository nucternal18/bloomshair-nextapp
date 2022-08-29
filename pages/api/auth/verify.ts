/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { withSentry } from "@sentry/nextjs";
import { PrismaClient } from "@prisma/client";

import { NEXT_URL } from "../../../config";
import { sendMail } from "../../../lib/mail";
import { verifyEmail } from "../../../lib/emailServices";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id, name, email } = req.body;

    const securedTokenId = nanoid(32); // create a secure reset password token

    const token = await prisma.tokens.create({
      data: {
        user: { connect: { id } },
        token: securedTokenId,
        type: "emailVerify",
      },
    });
    await prisma.$disconnect();

    const url = `${NEXT_URL}/account/verify-email/${securedTokenId}`;
    const subject = "Verification Email for Blooms Hair";

    if (token) {
      await sendMail({
        to: email,
        from: '"Blooms Hair" <no-reply@bloomshair.co.uk>',
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

export default withSentry(handler);
