import { AppDispatch } from "./../../app/store";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../../app/store";
import { AppError, AuthState, ProductProps, UserInfoProps } from "@lib/types";
import { HYDRATE } from "next-redux-wrapper";

interface IProduct {
  product?: ProductProps | null;
  requestStatus?: string;
  message?: string;
  success?: boolean;
  loading?: boolean;
  error?: string | Error | null;
  image?: string;
  uploading?: boolean;
  page?: number;
}

const initialState: IProduct = {
  product: null,
  requestStatus: "",
  message: "",
  success: false,
  loading: false,
  error: null,
  image: "",
  uploading: false,
  page: 1,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setProduct: (state, { payload }: PayloadAction<ProductProps | null>) => {
      state.product = payload;
    },
    setImage: (state, { payload }: PayloadAction<string>) => {
      state.image = payload;
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

export const { setPage, setProduct, setImage, setError } = productSlice.actions;
export const productSelector = (state: RootState) => state.product;
export default productSlice.reducer;
