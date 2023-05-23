import {
  AnyAction,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { orderApiSlice } from "app/global-state/api/apiSlice";
import { OrderProps, ServiceProps, PaymentResProps } from "@lib/types";
import { setOrder, setError } from "./orderSlice";

export const ordersAdapter = createEntityAdapter<ServiceProps>({});

export const ordersApi = orderApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrderProps[], void>({
      query: () => `/orders`,
      providesTags: (result) =>
        result
          ? result.map((order) => ({ type: "Order" as const, id: order.id }))
          : ["Order"],
    }),
    getOrder: builder.query<OrderProps, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, args) => [
        { type: "Order" as const, id: args },
      ],
    }),
    deleteOrder: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
    payOrder: builder.mutation<
      { success: boolean; message: string },
      { paymentResult: PaymentResProps; id: string }
    >({
      query: ({ paymentResult, id }) => ({
        url: `orders/myOrders/${id}/pay`,
        method: "PUT",
        body: { paymentResult },
      }),
      invalidatesTags: ["Order"],
    }),
    orderDelivery: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `orders/${id}/deliver`,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useDeleteOrderMutation,
  usePayOrderMutation,
  useOrderDeliveryMutation,
} = ordersApi;
