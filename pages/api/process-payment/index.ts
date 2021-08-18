/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import {
  locationsApi,
  idempotencyKey,
  paymentsApi,
} from "../../../lib/square-client";

/**
 * @param
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const { paymentToken, paymentAmount } = req.body;

    // get the currency for the location
    const locationResponse = await locationsApi.retrieveLocation(
      process.env.SQUARE_LOCATION_ID
    );
    const currency = locationResponse.result.location.currency;

    const { token } = cookie.parse(req.headers.cookie);
    if (!token) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    // Charge the customer's card
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
