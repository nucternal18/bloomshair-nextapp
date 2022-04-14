/* eslint-disable @typescript-eslint/no-misused-promises */
import { createContext, useReducer, useContext } from "react";

import { NEXT_URL } from "../../config";
import { orderConfirmationEmail } from "../../lib/emailServices";
import { sendMail } from "../../lib/mail";
import { OrderProps, PaymentResProps } from "../../lib/types";

export enum ActionType {
  ORDER_ACTION_REQUEST = "ORDER_ACTION_REQUEST",
  ORDER_ACTION_FAIL = "ORDER_ACTION_FAIL",
  ORDER_ACTION_CLEAR = "ORDER_ACTION_CLEAR",
  ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS",
  ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS",
  ORDER_PAY_SUCCESS = "ORDER_PAY_SUCCESS",
  ORDER_DELIVERY_SUCCESS = "ORDER_DELIVERY_SUCCESS",
  ORDER_TOTAL_PRICE = "ORDER_TOTAL_PRICE",
  ORDER_CONFIRMATION_SUCCESS = "ORDER_CONFIRMATION_SUCCESS",
}

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
  orderDelivery: (order: OrderProps) => void;
  getTotal: (data: number) => void;
  sendOrderConfirmationEmail: (id: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  createOrder: () => {},
  orderDelivery: () => {},
  getTotal: () => {},
  sendOrderConfirmationEmail: () => {},
});

export const orderReducer = (state, action) => {
  switch (action.type) {
    case ActionType.ORDER_ACTION_REQUEST:
      return { ...state, loading: true };
    case ActionType.ORDER_ACTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionType.ORDER_ACTION_CLEAR:
      return { ...state, loading: false, success: false, error: null };
    case ActionType.ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case ActionType.ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case ActionType.ORDER_PAY_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case ActionType.ORDER_DELIVERY_SUCCESS:
      return { ...state, loading: false, success: true };
    case ActionType.ORDER_CONFIRMATION_SUCCESS:
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
  const createOrder = async (
    newOrder: OrderProps,
    paymentResult: PaymentResProps
  ) => {
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
        sendOrderConfirmationEmail(data._id);
        dispatch({
          type: ActionType.ORDER_CREATE_SUCCESS,
          payload: data,
        });
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
   * @description send order confirmation email
   * @param id
   */
  const sendOrderConfirmationEmail = async (id: string) => {
    try {
      dispatch({
        type: ActionType.ORDER_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/orders/myOrders/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        await sendMail({
          to: data?.user?.email,
          from: "Blooms Hair <no-reply@bloomshair.co.uk>",
          subject: "Your Order Confirmation",
          html: orderConfirmationEmail(data),
        });
        dispatch({
          type: ActionType.ORDER_CONFIRMATION_SUCCESS,
        });
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

  // /**
  //  * @desc Send payment result to server
  //  * @param orderId
  //  * @param paymentResult
  //  */
  // const payOrder = async (orderId: string, paymentResult: PaymentResProps) => {
  //   try {
  //     dispatch({
  //       type: ActionType.ORDER_ACTION_REQUEST,
  //     });

  //     const res = await fetch(
  //       `${NEXT_URL}/api/orders/myOrders/${orderId}/pay`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ paymentResult }),
  //       }
  //     );

  //     if (res.ok) {
  //       dispatch({
  //         type: ActionType.ORDER_PAY_SUCCESS,
  //       });
  //     }
  //   } catch (error) {
  //     const err =
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : "Unable to complete payment";
  //     dispatch({
  //       type: ActionType.ORDER_ACTION_FAIL,
  //       payload: err,
  //     });
  //   }
  // };

  /**
   * @desc Set order delivery status to true
   * @param order
   */
  const orderDelivery = async (order: OrderProps) => {
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
        orderDelivery,
        sendOrderConfirmationEmail,
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
