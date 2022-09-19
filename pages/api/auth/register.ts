/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { verifyEmail } from "../../../lib/verifyEmail";
import { UserInfoProps } from "@lib/types";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      displayName,
      password,
      email,
      isAdmin,
      image,
      category,
      shippingAddress,
      emailVerified,
    } = req.body;

    if (
      !displayName ||
      !password ||
      password.trim().length < 7 ||
      !email ||
      !email.includes("@")
    ) {
      res.status(422).send({
        message: "Invalid inputs - password should be at least 7 characters",
      });
      return;
    }

    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist) {
      res.status(422).json({ success: false, message: "User already exists" });
      await prisma.$disconnect();
      return;
    }

    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await prisma.user.create({
        data: {
          name: displayName,
          email,
          password: hashedPassword,
          image: image
            ? image
            : "https://res.cloudinary.com/dtkjg8f0n/image/upload/v1625765848/blooms_hair_products/icons8-user-96_wyguya.png",
          isAdmin,
          category: category ? category : "customer",
          shippingAddress: shippingAddress ? shippingAddress : null,
          emailVerified: emailVerified,
        },
      });
      await prisma.$disconnect();
      await verifyEmail(user);
      res
        .status(201)
        .json({ success: true, message: "Created user successfully" });
    } catch (error) {
      res
        .status(404)
        .json({ success: false, message: "Unable to register user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default withSentry(handler);
