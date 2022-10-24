import { SnipcartItem, SnipcartShippingRate } from "./types";

type ShippingRate = {
  minWeight: number;
  maxWeight: number;
  parcelType: string;
} & SnipcartShippingRate;

export const shippingRates: Array<ShippingRate> = [
  {
    cost: 4.45,
    minWeight: 0.0,
    maxWeight: 2.0,
    parcelType: "small",
    description: "RoyalMail Standard 1st Class Shipping",
    guaranteedDaysToDelivery: 3,
    userDefinedId: "standard-shipping",
  },
  {
    cost: 6.95,
    minWeight: 2.01,
    maxWeight: 9.99,
    parcelType: "medium",
    description: "RoyalMail Standard 1st Class Shipping",
    guaranteedDaysToDelivery: 3,
    userDefinedId: "standard-shipping",
  },
  {
    cost: 7.95,
    minWeight: 2.01,
    maxWeight: 9.99,
    parcelType: "medium",
    description: "RoyalMail Standard 1st Class Shipping",
    guaranteedDaysToDelivery: 3,
    userDefinedId: "standard-shipping",
  },
  {
    cost: 12.95,
    minWeight: 9.99,
    maxWeight: 20.0,
    parcelType: "large",
    description: "RoyalMail Standard 1st Class Shipping",
    guaranteedDaysToDelivery: 3,
    userDefinedId: "standard-shipping",
  },
  {
    cost: 9.35,
    minWeight: 0.0,
    maxWeight: 5.0,
    parcelType: "small",
    description: "ParcelForce Guaranteed Next Day Delivery",
    guaranteedDaysToDelivery: 1,
    userDefinedId: "next-day-delivery",
  },
  {
    cost: 13.35,
    minWeight: 5.01,
    maxWeight: 10.0,
    parcelType: "medium",
    description: "ParcelForce Guaranteed Next Day Delivery",
    guaranteedDaysToDelivery: 1,
    userDefinedId: "next-day-delivery",
  },
  {
    cost: 15.35,
    minWeight: 10.01,
    maxWeight: 20.0,
    parcelType: "large",
    description: "ParcelForce Guaranteed Next Day Delivery",
    guaranteedDaysToDelivery: 1,
    userDefinedId: "next-day-delivery",
  },
  {
    cost: 18.35,
    minWeight: 20.01,
    maxWeight: 30.0,
    parcelType: "large",
    description: "ParcelForce Guaranteed Next Day Delivery",
    guaranteedDaysToDelivery: 3,
    userDefinedId: "next-day-delivery",
  },
];

export function getShippingRates(items: SnipcartItem[]) {
  const result: Array<SnipcartShippingRate> = [];
  const totalWeight = items.reduce((acc, item) => {
    const { quantity, weight } = item;
    return acc + quantity * weight;
  }, 0);
  const shippingRate = shippingRates.find((rate) => {
    return totalWeight >= rate.minWeight && totalWeight <= rate.maxWeight;
  });
  if (shippingRate) {
    result.push({
      ...shippingRate,
    });
  }
  return result;
}
