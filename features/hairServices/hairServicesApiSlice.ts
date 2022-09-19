import {
  AnyAction,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { hairServiceApiSlice } from "app/api/apiSlice";
import { ServiceProps } from "@lib/types";

export const hairServiceAdapter = createEntityAdapter<ServiceProps>({});

export const hairServiceApi = hairServiceApiSlice.injectEndpoints({
  endpoints: (builder) => ({}),
});
