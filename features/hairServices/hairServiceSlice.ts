import { AppDispatch } from "./../../app/store";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../../app/store";
import { AppError, ServiceCategory, ServiceProps } from "@lib/types";
import { HYDRATE } from "next-redux-wrapper";

export type IServiceState = {
  service: ServiceProps | null;
  isLoading: boolean;
  error: string;
  success: boolean;
  message: string;
  isError: boolean;
  category: ServiceCategory | null;
  categoryOptions?: string[];
  sortBy?: string;
  sortByOptions?: string[];
};

export const initialServiceState: IServiceState = {
  service: null,
  category: ServiceCategory.Gents_Hair,
  categoryOptions: [
    "Gents_Hair",
    "Ladies_Hair",
    "Technical",
    "Hair_Treatments",
  ],
  sortBy: "latest",
  sortByOptions: ["latest", "oldest"],
  isLoading: true,
  error: "",
  success: false,
  message: "",
  isError: false,
};

const hairServiceSlice = createSlice({
  name: "hairService",
  initialState: initialServiceState,
  reducers: {
    setService: (state, { payload }: PayloadAction<ServiceProps | null>) => {
      state.service = payload;
    },
    setSearchOptions: (
      state,
      { payload }: PayloadAction<{ sortBy: string; category: ServiceCategory }>
    ) => {
      state.category = payload.category;
      state.sortBy = payload.sortBy;
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

export const { setService, setSearchOptions } = hairServiceSlice.actions;
export const hairServiceSelector = (state: RootState) => state.hairService;
export default hairServiceSlice.reducer;
