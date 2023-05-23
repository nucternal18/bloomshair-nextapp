import type { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  SnipcartRequest,
  SnipcartWebhookContent,
  SnipcartWebhookEvent,
} from "@lib/types";

const prisma = new PrismaClient();

export default async function handler(
  req: SnipcartRequest,
  res: NextApiResponse
) {
  const allowedEvents: SnipcartWebhookEvent[] = [
    "order.completed",
    "customauth:customer_updated",
  ];

  const token = req.headers["x-snipcart-requesttoken"];

  const { eventName, content } = req.body;

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  if (!allowedEvents.includes(eventName))
    return res.status(400).json({ message: "This event is not permitted" });

  if (!token) return res.status(401).json({ message: "Not Authorized" });

  //   try {
  //     const verifyToken = await fetch(
  //       `https://app.snipcart.com/api/requestvalidation/${token}`
  //     );

  //     if (!verifyToken.ok)
  //       return res.status(401).json({ message: "Not Authorization" });
  //   } catch (err) {
  //     console.log(err);
  //     return res
  //       .status(500)
  //       .json({ message: "Unable to verify Snipcart webhook token" });
  //   }

  try {
    switch (eventName) {
      case "order.completed":
        await createOrder(content);
        break;
      case "customauth:customer_updated":
        return res
          .status(200)
          .json({ message: "Customer updated - no action taken" });
      default:
        throw new Error("No such event handler exists");
    }

    res.status(200).json({ message: "Done" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

const createOrder = async (order: SnipcartWebhookContent) => {
  const {
    invoiceNumber,
    paymentStatus,
    paymentMethod,
    email,
    shippingAddress,
    items,
    grandTotal,
    taxesTotal,
    shippingRateUserDefinedId,
    shippingFees,
    completionDate,
  } = order;

  const customerShippingAddress = {
    address: shippingAddress.address1,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  };
  const purchasedItems = items.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      qty: item.quantity,
      image: item.image,
    };
  });
  try {
    const order = await prisma.orders.create({
      data: {
        orderItems: purchasedItems,
        user: {
          connectOrCreate: {
            where: { email: email },
            create: {
              name: shippingAddress.fullName && shippingAddress.fullName,
              email: email,
              image:
                "https://res.cloudinary.com/dtkjg8f0n/image/upload/v1625765848/blooms_hair_products/icons8-user-96_wyguya.png",
            },
          },
        },
        shippingAddress: customerShippingAddress,
        paymentMethod,
        itemsPrice: grandTotal,
        taxPrice: taxesTotal,
        shippingPrice: shippingFees ? shippingFees : 0,
        totalPrice: grandTotal,
        isPaid: true,
        paidAt: new Date(),
        paymentResult: {
          status: paymentStatus,
          orderId: invoiceNumber,
          completionDate: completionDate,
          email_address: email,
          shippingRateUserDefinedId: shippingRateUserDefinedId
            ? shippingRateUserDefinedId
            : "free_shipping",
        },
      },
    });
    await prisma.$disconnect();
    return order;
  } catch (error: any) {
    console.log(error);
  }
};
