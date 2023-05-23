import {
  AnyAction,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { hairServiceApiSlice } from "app/global-state/api/apiSlice";
import { ServiceProps } from "@lib/types";
import { Category } from "@prisma/client";

export const hairServiceAdapter = createEntityAdapter<ServiceProps>({});

export const hairServiceApi = hairServiceApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHairServices: builder.query<
      ServiceProps[],
      { sortBy: string; category: Category }
    >({
      query: ({ sortBy, category }) => ({
        url: `/hair-services?sortBy=${sortBy}&category=${category}`,
      }),
      providesTags: (result, error, arg) =>
        result
          ? result.map((service) => ({
              type: "HairService" as const,
              id: service.id,
            }))
          : ["HairService"],
    }),
    getHairServiceById: builder.query<ServiceProps, string>({
      query: (id) => ({
        url: `/hair-services/${id}`,
      }),
      providesTags: (result, error, arg) => [
        { type: "HairService" as const, id: arg },
      ],
    }),
    createService: builder.mutation<
      { success: boolean; message: string },
      ServiceProps
    >({
      query: (body) => ({
        url: "/hair-services",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["HairService"],
    }),
    updateService: builder.mutation<
      { success: boolean; message: string },
      ServiceProps
    >({
      query: (body) => ({
        url: `/hair-services/${body.id}`,
        method: "PUT",
        body: { ...body },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "HairService", id: arg?.id },
      ],
    }),
    deleteService: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/hair-services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "HairService", id: arg },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHairServicesQuery,
  useGetHairServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = hairServiceApi;
