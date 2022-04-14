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
