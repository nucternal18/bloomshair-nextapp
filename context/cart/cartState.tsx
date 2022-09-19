export const cartItemsFromStorage =
  typeof window !== "undefined"
    ? localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") as string)
      : []
    : [];

export const shippingAddressFromStorage =
  typeof window !== "undefined"
    ? localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress") as string)
      : {}
    : {};
export const paymentMethodFromStorage =
  typeof window !== "undefined"
    ? localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod") as string)
      : ""
    : "";
