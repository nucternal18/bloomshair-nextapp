import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { AppError, OrderProps } from "@lib/types";
import { HYDRATE } from "next-redux-wrapper";

interface IOrderState {
  success?: boolean;
  loading?: boolean;
  error?: AppError | null;
  totalPrice?: number;
  order?: OrderProps | null;
}

const initialState: IOrderState = {
  success: false,
  loading: false,
  error: null,
  totalPrice: 0,
  order: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getTotalPrice: (state, { payload }: PayloadAction<number>) => {
      state.totalPrice = payload;
    },
    setOrder: (state, { payload }: PayloadAction<OrderProps>) => {
      state.order = payload;
    },
    setError: (state, { payload }: PayloadAction<AppError>) => {
      state.error = payload;
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

export const { getTotalPrice, setOrder, setError } = orderSlice.actions;
export const orderSelector = (state: RootState) => state.order;
export default orderSlice.reducer;
