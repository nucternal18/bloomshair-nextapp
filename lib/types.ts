import { UserCategory, UsersShippingAddress } from "@prisma/client";
import type { NextApiRequest } from "next";

import {
  FieldErrorsImpl,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";

declare global {
  interface Window {
    paypal?: any;
    Square?: any;
    Snipcart: any;
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "address-fields": any;
      "snipcart-label": any;
      "snipcart-input": any;
    }
  }
}

export interface IForm<T extends FieldValues> {
  handleSubmit: UseFormHandleSubmit<T>;
  submitHandler: SubmitHandler<T>;
  register: UseFormRegister<T>;
  errors: FieldErrorsImpl<T>;
}

export type IFormData = {
  search?: string;
  price?: number;
  category?: string;
  sortBy?: string;
  serviceName?: string;
  image?: string | ArrayBuffer | null;
  name?: string;
  brand?: string;
  countInStock?: number;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  emailVerified?: boolean;
};

export interface IProductPageProps {
  products: ProductProps[];
  pages: number;
  page: number;
}

export enum ServiceCategory {
  Gents_Hair = "Gents_Hair",
  Ladies_Hair = "Ladies_Hair",
  Technical = "Technical",
  Hair_Treatments = "Hair_Treatments",
}

export type ServiceProps = {
  id?: string;
  name?: string;
  price?: number;
  category?: ServiceCategory;

  createdAt?: string;
  updatedAt?: string;
};

export type ReviewProps = {
  rating: number;
  comment: string;
};

export type ProductProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  description?: string;
  rating?: number;
  numReviews?: number;
  reviews?: ReviewProps[];
  slug?: string;
  weight: number;
};

export interface AppError extends Error {
  success: boolean;
  message: string;
}

export interface AuthState {
  currentUser: UserInfoProps | null;
  token: string | null;
  error: Error | undefined;
  image?: string;
  categoryOptions?: UserCategory[];
}

export type UserInfoProps = {
  category: UserCategory;
  emailVerified: Date | null;
  password: string | null;
  shippingAddress: UsersShippingAddress | null;
  refresh_token: string | null;
  access_token: string | null;
  id_token: string | null;
  id?: string;
  name?: string;
  image?: string;
  token?: string;
  isAdmin?: boolean;
  email?: string;
  isEmailVerified?: boolean;
  orders?: OrderProps[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type PaymentResProps = {
  id: string;
  status: string;
  orderId: string;
  update_time: string;
  email_address: string;
};

export type paymentMethodProps = {
  paymentMethod: string;
};

export type ShippingAddressProps = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryMethod?: string;
};

export type CartItemsProps = {
  id?: string;
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

export type OrderProps = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
  orderItems?: CartItemsProps[];
  user?: {
    name: string;
    email: string;
  };
  shippingAddress?: ShippingAddressProps | null;
  paymentMethod?: string;
  itemsPrice?: number;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice?: number;
  isPaid?: boolean;
  paidAt?: Date;
  createdAt?: Date;
  deliveredAt?: Date;
  isDelivered?: boolean;
  id?: string;
};

export type GalleryProps = {
  id: string;
  image: string;
  admin?: Partial<UserInfoProps>;
  createdAt: string;
  updatedAt: string;
};

export type SnipcartWebhookEvent =
  | "order.completed"
  | "order.status.changed"
  | "order.paymentStatus.changed"
  | "order.trackingNumber.changed"
  | "order.refund.created"
  | "order.notification.created"
  | "subscription.created"
  | "subscription.cancelled"
  | "subscription.paused"
  | "subscription.resumed"
  | "subscription.invoice.created"
  | "shippingrates.fetch"
  | "taxes.calculate"
  | "customauth:customer_updated";

export interface SnipcartWebhookContent {
  discounts: { [key: string]: any };
  items: { [key: string]: any };
  shippingAddress: {
    fullName: string;
    firstName?: string;
    name: string;
    company?: string;
    address1: string;
    address2?: string;
    fullAddress: string;
    city: string;
    country: string;
    postalCode: string;
    province: string;
    phone?: string;
  };
  shippingRateUserDefinedId?: string;
  [key: string]: any;
}

export type SnipcartShippingRate = {
  /** Shipping method's price. */
  cost: number;
  /** Name or description of the shipping method. */
  description: string;
  /** Estimated time for delivery in days. */
  guaranteedDaysToDelivery?: number;
  /** Internal ID of shipping method, can be useful when using shipping fulfillment solutions. */
  userDefinedId?: string;
};

export type SnipcartTaxItem = {
  name: string;
  amount: number;
  rate: number;
  numberForInvoice?: string;
  includedInPrice?: boolean;
  appliesOnShipping?: boolean;
};

export interface SnipcartRequest extends NextApiRequest {
  headers: {
    "x-snipcart-requesttoken"?: string;
  };
  body: {
    eventName: SnipcartWebhookEvent;
    mode: string;
    createdOn: string;
    content: SnipcartWebhookContent;
  };
}

export type SnipcartItem = {
  uniqueId: string;
  id: string;
  name: string;
  price: string;
  quantity: number;
  url: string;
  weight: number;
  description: string;
  image: string;
  customFieldsJson: JSON;
  stackable: boolean;
  maxQuantity: number | null;
  totalPrice: number;
  totalWeight: number;
};

export interface ISyncProduct {
  id: string;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
}
