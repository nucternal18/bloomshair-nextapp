/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { withSentry } from "@sentry/nextjs";
import {
  locationsApi,
  idempotencyKey,
  paymentsApi,
} from "../../../lib/square-client";

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

    const { paymentToken, paymentAmount } = req.body;

    /**
     * @desc get the currency for the location
     */
    const locationResponse = await locationsApi.retrieveLocation(
      process.env.SQUARE_LOCATION_ID
    );
    const currency = locationResponse.result.location.currency;

    /**
     * @desc Charge the customer's card
     */
    const requestBody = {
      idempotencyKey,
      sourceId: paymentToken,
      amountMoney: {
        amount: paymentAmount, // $1.00 charge
        currency,
      },
    };

    try {
      const {
        result: { payment },
      } = await paymentsApi.createPayment(requestBody);

      const result = JSON.stringify(
        payment,
        (key, value) => {
          return typeof value === "bigint"
            ? parseInt(value.toLocaleString())
            : value;
        },
        4
      );

      res.json({
        result,
      });
    } catch (error) {
      res.json(error.result);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default withSentry(handler);
