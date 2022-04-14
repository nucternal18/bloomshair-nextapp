import { createContext, useContext, useReducer } from "react";
import { CartItemsProps, ShippingAddressProps } from "../../lib/types";
import { ActionType, Actions } from "./cartActions";

import {
  cartItemsFromStorage,
  paymentMethodFromStorage,
  shippingAddressFromStorage,
} from "./cartState";

export interface InitialCartState {
  cart: {
    cartItems?: CartItemsProps[];
    shippingAddress?: ShippingAddressProps | null;
    paymentMethod?: string;
    qty?: number;
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

const CartContext = createContext<{
  state: InitialCartState;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CartReducer = (state: InitialCartState, action: Actions) => {
  switch (action.type) {
    case ActionType.CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (i) => i.product === newItem.product
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.product === existItem.product ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case ActionType.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: { ...state.cart, cartItems },
      };
    }
    case ActionType.CART_SAVE_SHIPPING_ADDRESS:
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case ActionType.CART_SAVE_PAYMENT_METHOD:
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case ActionType.CART_SAVE_QTY:
      return {
        ...state,
        cart: { ...state.cart, qty: action.payload },
      };
    case ActionType.CART_INCREASE_QTY:
      return {
        ...state,
        cart: { ...state.cart, qty: state.cart.qty + 1 },
      };
    case ActionType.CART_DECREASE_QTY:
      return {
        ...state,
        cart: { ...state.cart, qty: state.cart.qty - 1 },
      };
    case ActionType.CLEAR_CART:
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");
      return {
        ...state,
        cart: { ...state.cart, cartItems: [] },
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartContext, CartProvider, useCart };
