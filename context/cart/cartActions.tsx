import {
  CartItemsProps,
  paymentMethodProps,
  ShippingAddressProps,
} from "./cartState";

export enum ActionType {
  CART_ADD_ITEM = "CART_ADD_ITEM",
  CART_REMOVE_ITEM = "CART_REMOVE_ITEM",
  CART_SAVE_SHIPPING_ADDRESS = "CART_SAVE_SHIPPING_ADDRESS",
  CART_SAVE_PAYMENT_METHOD = "CART_SAVE_PAYMENT_METHOD",
  CART_INCREASE_QTY = "CART_INCREASE_QTY",
  CART_DECREASE_QTY = "CART_DECREASE_QTY",
  CLEAR_CART = "CLEAR_CART",
  CART_SAVE_QTY = "CART_SAVE_QTY",
}

export interface IAddToCart {
  type: ActionType.CART_ADD_ITEM;
  payload: CartItemsProps;
}

interface IRemoveFromCart {
  type: ActionType.CART_REMOVE_ITEM;
  payload: string;
}

interface IClearCart {
  type: ActionType.CLEAR_CART;
}

interface ISaveShippingAddress {
  type: ActionType.CART_SAVE_SHIPPING_ADDRESS;
  payload: ShippingAddressProps;
}

interface ISavePaymentMethod {
  type: ActionType.CART_SAVE_PAYMENT_METHOD;
  payload: string;
}

interface ISaveQty {
  type: ActionType.CART_SAVE_QTY;
  payload: number;
}

interface IIncreaseQty {
  type: ActionType.CART_INCREASE_QTY;
}

interface IDecreaseQty {
  type: ActionType.CART_DECREASE_QTY;
}

export type Actions =
  | IAddToCart
  | IRemoveFromCart
  | IClearCart
  | ISaveShippingAddress
  | ISavePaymentMethod
  | IIncreaseQty
  | IDecreaseQty
  | ISaveQty;

// Add item to cart
export const addToCart = (data): IAddToCart => ({
  type: ActionType.CART_ADD_ITEM,
  payload: data,
});

// Remove item from  cart
export const removeFromCart = (id): IRemoveFromCart => ({
  type: ActionType.CART_REMOVE_ITEM,
  payload: id,
});

export const getCartItems = () => {
  const cart =
    typeof window !== "undefined"
      ? localStorage.getItem("cartItems")
        ? JSON.parse(window.localStorage.getItem("cartItems"))
        : []
      : [];

  return cart;
};

// clear all cart items
export const clearCart = (): IClearCart => ({
  type: ActionType.CLEAR_CART,
});

// Save shipping information to local storage
export const saveShippingAddress = (
  data: ShippingAddressProps
): ISaveShippingAddress => ({
  type: ActionType.CART_SAVE_SHIPPING_ADDRESS,
  payload: data,
});

// save payment method to localStorage
export const savePaymentMethod = (data: string): ISavePaymentMethod => ({
  type: ActionType.CART_SAVE_PAYMENT_METHOD,
  payload: data,
});

export const increaseQty = (): IIncreaseQty => ({
  type: ActionType.CART_INCREASE_QTY,
});
export const decreaseQty = (): IDecreaseQty => ({
  type: ActionType.CART_DECREASE_QTY,
});

export const saveQty = (amount: number): ISaveQty => ({
  type: ActionType.CART_SAVE_QTY,
  payload: amount,
});
