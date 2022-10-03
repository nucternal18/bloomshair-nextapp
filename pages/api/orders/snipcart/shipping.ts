import type { NextApiRequest, NextApiResponse } from "next";
import { SnipcartShippingRate } from "@lib/types";

interface SnipcartRequest extends NextApiRequest {
  body: {
    eventName: string;
    mode: string;
    createdOn: string;
    content: { [key: string]: any };
  };
}

type Data = {
  /** An array of shipping rates. */
  rates: SnipcartShippingRate[];
};

type Error = {
  errors: { key: string; message: string }[];
};

export default async function handler(
  req: SnipcartRequest,
  res: NextApiResponse<Data | Error>
) {
  const { eventName, content } = req.body;

  if (eventName !== "shippingrates.fetch") return res.status(200).end();
  if (content.items.length === 0) return res.status(200).end();

  const { items } = content;

  const result: SnipcartShippingRate[] = [];
  try {
    res.status(200).json({
      rates: result.map((rate) => ({
        cost: rate.cost,
        description: rate.description,
        userDefinedId: rate.userDefinedId,
        guaranteedDaysToDelivery: rate.guaranteedDaysToDelivery,
      })),
    });
  } catch (error: any) {
    console.log(error);
    res.status(200).json({
      errors: [
        {
          key: error?.reason,
          message: error?.message,
        },
      ],
    });
  }
}
