/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { randomUUID } from "crypto";

import { Client, Environment } from "square";

const dev = process.env.NODE_ENV !== "production";

const { paymentsApi } = new Client({
  environment: dev ? Environment.Sandbox : Environment.Production,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

/**
 * @param
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method === "POST") {
    if (!session) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    const { sourceId, paymentAmount } = req.body;

    const {
      result: { payment },
    } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: sourceId,
      amountMoney: {
        amount: BigInt(paymentAmount * 100), // $1.00 charge
        currency: "GBP",
      },
    });

    const result = JSON.stringify(
      payment,
      (key, value) => {
        return typeof value === "bigint" ? value.toLocaleString() : value;
      },
      4
    );
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
