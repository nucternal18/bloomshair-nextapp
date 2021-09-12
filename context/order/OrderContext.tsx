import {
  useState,
  createContext,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { useRouter } from "next/router";

import { NEXT_URL } from "../../config";
import {
  CartItemsProps,
  PaymentResProps,
  ShippingAddressProps,
} from "../cart/cartState";

enum ActionType {
  ORDER_ACTION_REQUEST = "ORDER_ACTION_REQUEST",
  ORDER_ACTION_FAIL = "ORDER_ACTION_FAIL",
  ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS",
  ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS",
  ORDER_PAY_SUCCESS = "ORDER_PAY_SUCCESS",
  ORDER_DELIVERY_SUCCESS = "ORDER_DELIVERY_SUCCESS",
  ORDER_TOTAL_PRICE = "ORDER_TOTAL_PRICE",
}

export type OrderProps = {
  orderItems: CartItemsProps[];
  shippingAddress: ShippingAddressProps;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid?: boolean;
  paidAt?: Date;
  deliveredAt?: Date;
  isDelivered?: boolean;
  _id?: string;
};

interface IOrderState {
  success?: boolean;
  loading?: boolean;
  error?: string | Error | null;
  totalPrice?: number;
  order?: OrderProps;
}

const initialState = {
  success: false,
  loading: false,
  error: null,
  totalPrice: 0,
  order: null,
};

export const OrderContext = createContext<{
  state: IOrderState;
  dispatch: React.Dispatch<any>;
  createOrder: (newOrder: OrderProps, paymentResult: PaymentResProps) => void;
  payOrder: (orderId: string, paymentResult: PaymentResProps) => void;
  orderDelivery: (order: OrderProps) => void;
  getTotal: (data: number) => void;
}>({
  state: initialState,
  dispatch: () => null,
  createOrder: () => {},
  payOrder: () => {},
  orderDelivery: () => {},
  getTotal: () => {},
});

export const orderReducer = (state, action) => {
  switch (action.type) {
    case ActionType.ORDER_ACTION_REQUEST:
      return { ...state, loading: true };
    case ActionType.ORDER_ACTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionType.ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case ActionType.ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case ActionType.ORDER_PAY_SUCCESS:
      return { ...state, loading: false, success: true };
    case ActionType.ORDER_DELIVERY_SUCCESS:
      return { ...state, loading: false, success: true };
    case ActionType.ORDER_TOTAL_PRICE:
      return { ...state, totalPrice: action.payload };
    default:
      return state;
  }
};

const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  /**
   * @desc create order
   * @param newOrder
   */
  const createOrder = async (newOrder, paymentResult) => {
    try {
      dispatch({
        type: ActionType.ORDER_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/orders/myOrders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newOrder, paymentResult }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({
          type: ActionType.ORDER_CREATE_SUCCESS,
          payload: data,
        });

        localStorage.clear();
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to create order";
      dispatch({
        type: ActionType.ORDER_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   * @desc Send payment result to server
   * @param orderId
   * @param paymentResult
   */
  const payOrder = async (orderId, paymentResult) => {
    try {
      dispatch({
        type: ActionType.ORDER_ACTION_REQUEST,
      });

      const res = await fetch(
        `${NEXT_URL}/api/orders/myOrders/${orderId}/pay`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentResult }),
        }
      );

      if (res.ok) {
        dispatch({
          type: ActionType.ORDER_PAY_SUCCESS,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to complete payment";
      dispatch({
        type: ActionType.ORDER_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   * @desc Set order delivery status to true
   * @param order
   */
  const orderDelivery = async (order) => {
    try {
      dispatch({
        type: ActionType.ORDER_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/orders/${order._id}/deliver`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        dispatch({
          type: ActionType.ORDER_DELIVERY_SUCCESS,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to fetch products";
      dispatch({
        type: ActionType.ORDER_ACTION_FAIL,
        payload: err,
      });
    }
  };

  const getTotal = (data: number) => {
    dispatch({ type: ActionType.ORDER_TOTAL_PRICE, payload: data });
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
        createOrder,
        payOrder,
        orderDelivery,
        getTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => {
  return useContext(OrderContext);
};

export { OrderContextProvider, useOrder };
