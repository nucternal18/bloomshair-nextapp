import { AppDispatch } from "../../store";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../../store";
import { AppError } from "@lib/types";
import { HYDRATE } from "next-redux-wrapper";

import { CartItemsProps, ShippingAddressProps } from "@lib/types";

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

export interface InitialCartState {
  cart: {
    cartItems: CartItemsProps[];
    shippingAddress: ShippingAddressProps | null;
    paymentMethod: string;
    qty: number;
  };
}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
    qty: 1,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<CartItemsProps>) => {
      const newItem = payload;
      const existItem = state.cart.cartItems.find(
        (i: CartItemsProps) => i.product === newItem.product
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItemsProps) =>
            item.product === existItem.product ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      state.cart = { ...state.cart, cartItems };
    },
    getCartItems: (state) => {
      const cartItems =
        typeof window !== "undefined"
          ? localStorage.getItem("cartItems")
            ? JSON.parse(window.localStorage.getItem("cartItems") as string)
            : []
          : [];
      state.cart = { ...state.cart, cartItems };
    },
    removeFromCart: (state, { payload }: PayloadAction<string>) => {
      const cartItems = state.cart.cartItems.filter(
        (item: CartItemsProps) => item.product !== payload
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      state.cart = { ...state.cart, cartItems };
    },
    saveShippingAddress: (
      state,
      { payload }: PayloadAction<ShippingAddressProps>
    ) => {
      localStorage.setItem("shippingAddress", JSON.stringify(payload));
      state.cart = { ...state.cart, shippingAddress: payload };
    },
    savePaymentMethod: (state, { payload }: PayloadAction<string>) => {
      localStorage.setItem("paymentMethod", JSON.stringify(payload));
      state.cart = { ...state.cart, paymentMethod: payload };
    },
    increaseQty: (state) => {
      state.cart = { ...state.cart, qty: state.cart.qty + 1 };
    },
    decreaseQty: (state) => {
      state.cart = { ...state.cart, qty: state.cart.qty - 1 };
    },
    saveQty: (state, { payload }: PayloadAction<number>) => {
      state.cart = { ...state.cart, qty: payload };
    },
    clearCart: (state) => {
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");
      state.cart = {
        ...state.cart,
        cartItems: [],
        shippingAddress: null,
        paymentMethod: "",
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload) {
        state = action.payload;
      }
    },
  },
});

export const {
  addToCart,
  getCartItems,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  increaseQty,
  decreaseQty,
  saveQty,
  clearCart,
} = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
export default cartSlice.reducer;
