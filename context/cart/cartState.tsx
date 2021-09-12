export type PaymentResProps = {
  id: string;
  status: string;
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
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

export const cartItemsFromStorage =
  typeof window !== "undefined"
    ? localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
    : [];

export const shippingAddressFromStorage =
  typeof window !== "undefined"
    ? localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {}
    : {};
export const paymentMethodFromStorage =
  typeof window !== "undefined"
    ? localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod"))
      : ""
    : "";
